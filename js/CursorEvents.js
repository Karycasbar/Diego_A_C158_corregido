AFRAME.registerComponent('cursor_detected', {
    schema:{
        selectedItemId : {type: 'string', default: ''},
    }, init: function(){
        this.handleClickEvent()
        this.handleEnterEvents();
        this.handleMouseLeaveEvents();       

    },
    handleClickEvent: function(){
        this.el.addEventListener('click', evt =>{
            const placesContainer = document.querySelector("#places-container")
            const {state} = placesContainer.getAttribute('tour_action')

            if(state === "places-list"){
                const id = this.el.getAttribute("id")
                const placesId= ["taj-mahal", "budapest", "eiffel-tower", "new-york-city"]

                if(placesId.includes(id)){
                    placesContainer.setAttribute('tour_action', {
                        state: 'view',
                        selected_card: id
                    })
                }
            }
            if(state === "view"){
                this.handleViewState()
            }
            if(state === "change-view"){
                this.handleViewState()
            }
        })
    }, handleViewState: function() {
        const el = this.el;
        const id = el.getAttribute("id");
        const placesContainer = document.querySelector("#places-container");
        const { selectedItemId } = placesContainer.getAttribute("cursor_detected");
       // Mantener todas las imágenes con el ID de las imágenes más la extensión .jpg
        const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"];
        if (sideViewPlacesId.includes(id)) {      
          placesContainer.setAttribute("tour_action", {
            state: "change-view"
          });
    
          const skyEl = document.querySelector("#main-container");
          // Establecer la imagen de 360 grados al elemento del cielo.
          skyEl.setAttribute("material", {
            src: `./360_images/${selectedItemId}/${id}.jpg`,
            color: "#fff"
          });     
        }
      },
    handlePlacesListState: function(){
        const id = this.el.getAttribute('id')
        const placesId = ["taj-mahal", "budapest", "eiffel-tower", "new-york-city"]
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
