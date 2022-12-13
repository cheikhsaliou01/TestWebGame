
window.addEventListener('load', () => {
    console.info('App loaded');

    let box = document.getElementById('box');

    let limits = box.getBoundingClientRect();

    let draggable = new Draggable(
        document.getElementById('draggable'),
        limits
    );

    box.addEventListener('mousemove', (event) => {
        draggable.moveTo(
            event.x,
            event.y
        )
    });
})

class Draggable{
    constructor(elem, limits) {

        this.elem = elem;

        this.x;
        this.y;

        this.limits = limits;

        this.been_clicked = false;

        this.mouse_over = false;

        this.elem.addEventListener('mouseover', ()=>{
            this.mouse_over = true;
        })

        this.elem.addEventListener('mouseout', ()=>{
            this.mouse_over = false;
        })

        this.elem.addEventListener('mousedown', (event)=>{
            this.been_clicked = true;
            this.offset = {
                x: event.offsetX,
                y: event.offsetY,
            }
        });

        this.elem.addEventListener('mouseup', ()=>{
            this.been_clicked = false;
        });
    }

    moveTo(x, y){
        if(this.been_clicked && this.mouse_over){

            if(this.canMove('x', x)){
                this.x = x - this.limits.left - this.offset.x;
            }

            if(this.canMove('y', y)){
                this.y = y - this.limits.top - this.offset.y;
            }

            this.elem.style.transform = "translate(" + this.x + "px," + this.y + "px)"
        }

    }

    canMove(side, val)
    {
        let assoc_lt = {
            x: 'left',
            y: 'top'
        }
        let assoc_rb = {
            x: 'right',
            y: 'bottom'
        }

        return (val - this.limits[assoc_lt[side]] >= this.offset[side])
            && (val - this.offset[side] +
                (side === 'x' ? this.elem.clientWidth : this.elem.clientHeight)
                < this.limits[assoc_rb[side]]);

    }
}