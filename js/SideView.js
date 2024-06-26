AFRAME.registerComponent('places-helicopter', {
    init: function(){
        this.createPlacesBackground()
    },tick: function(){
        const placeContainer = document.querySelector("#places-container")
        const {state} = placeContainer.getAttribute("tour_action")

        if(state === "view" || state === "change-view"){
            this.el.setAttribute('visible', true)
        }else{
            this.el.setAttribute('visible', false)
        }
    },createPlacesBackground: function(){
        const sideViewContainer = document.querySelector('#vistas')
        var prevoiusXPosition = -150
        var prevoiusYPosition =  30

        for(var i = 1; i <= 4; i++){
            const position = {
                x:(prevoiusXPosition += 50),
                y:(prevoiusYPosition += 2),
                z:-40
            }
            const entityEl = this.createPlaces(position, i)
            sideViewContainer.appendChild(entityEl)
        }
    },createPlaces: function(position, id){
        const entityEl = document.createElement('a-entity')
        entityEl.setAttribute('visible', true)
        entityEl.setAttribute('id', `place-${id}`)

        entityEl.setAttribute('geometry', {
            primitive: 'circle',
            radius: 2.5
        })
        entityEl.setAttribute('material', {
            src: "./assets/helicopter.png",
            opacity: 0.9
        })

        entityEl.setAttribute('position', position)
        entityEl.setAttribute('cursor_detected', {})
        return entityEl
    }
})