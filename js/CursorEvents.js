AFRAME.registerComponent('cursor_detected', {
    schema:{
        selectedItemId : {type: 'string', default: ''},
    }, init: function(){
        this.handleEnterEvents();
        this.handleMouseLeaveEvents();       

    },handlePlacesListState: function(){
        const id = this.el.getAttribute('id')
        const placesId = ["taj_mahal_id", "budapest_id", "eiffel_tower_id", "new_york_id"]
        if(placesId.includes(id)){
            const placeContainer = document.querySelector('#places-container')
            placeContainer.setAttribute("cursor_detected", {
                selectedItemId: id
            })
            this.el.setAttribute("material", {
                color: "#D76B30",
                opacity: 1
            })
        }

    }, handleEnterEvents: function(){
        //mouse enter del cursor
        this.el.addEventListener("mouseenter", ()=>{
            this.handlePlacesListState()
        })
    }, handleMouseLeaveEvents: function(){
        //el evneto mouse leave del cursor
        this.el.addEventListener('mouseleave', ()=>{
            const {selectedItemId} = this.data
            if(selectedItemId){
                const el = document.querySelector(`#${selectedItemId}`)
                const id = el.getAttribute("id")
                if (id === selectedItemId){
                    el.setAttribute('material', 
                        {color: "#0077CC", opacity: 1})
                }
            }
        })
    }
})