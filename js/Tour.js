AFRAME.registerComponent('tour_action',{
    schema:{
        state: {type: 'string', default: "places-list"},
        selected_card: {type: 'string', default: '#card1'}
    },    
    init: function(){

        this.placesContainer = this.el;
        this.createCards()
    },
    tick: function(){
        const {state} = this.el.getAttribute('tour_action')

        if(state === 'view'){
            this.hiddenEl([this.placesContainer])
            this.showView()
        }
    },
    hiddenEl: function(eList){
        eList.map(el =>{
            el.setAttribute("visible", false)
        })
    },

    showView: function(){
        const {selected_card} = this.data

        //Ponemos la imagen de 360° al cielo :)
        const skyEl = document.querySelector('#main-container')
        skyEl.setAttribute('material', {
            src: `./360_images/${selected_card}/place-0.jpg`,
            color: 'white'
        })

    },
    
     createCards: function(){
        const thumbNailsRef = [
            {
                id: "taj-mahal",
                title: "Taj Mahal",
                url: './assets/thumbnails/taj_mahal.png'
            },
            {
                id: "budapest",
                title: "Budapest",
                url: './assets/thumbnails/budapest.jpg'
            },
            {
                id: "eiffel-tower",
                title: "Torre Eiffel",
                url: './assets/thumbnails/eiffel_tower.jpg'
            },
            {
                id: "new-york-city",
                title: "Nueva York",
                url: './assets/thumbnails/new_york_city.png'
            },
        ]

        var previusXPosition = -60
        for(var item of thumbNailsRef){
            const posX = previusXPosition + 25
            const posY = 10
            const posZ = -40
            const position = {x: posX, y: posY, z: posZ}

            previusXPosition = posX;

            const bordeEl = this.createBorder(position, item.id)
            const thumbNailEl = this.createThumbNail(item)
            bordeEl.appendChild(thumbNailEl)
            const titleEl = this.createTitleEl(position, item)
            bordeEl.appendChild(titleEl)
            this.placesContainer.appendChild(bordeEl)
        }

    }, createBorder: function(position, id){
        const entityEl = document.createElement('a-entity')
        entityEl.setAttribute('id', id)
        entityEl.setAttribute("visible", true)
        entityEl.setAttribute('position', position)
        entityEl.setAttribute('geometry', {primitive: "ring",
            radiusInner: 9,
            radiusOuter: 10
        })
        entityEl.setAttribute("material", 
            {color: '#0077CC',
            opacity: 1
            }
        )
        entityEl.setAttribute('cursor_detected', {})

        return entityEl
    }, createThumbNail: function(item){
        const entityEl = document.createElement('a-entity')
        entityEl.setAttribute('visible', true)
        entityEl.setAttribute('geometry',{
            primitive: 'circle',
            radius: 9
        })
        entityEl.setAttribute('material', {src: item.url})
        return entityEl
    }, createTitleEl: function(position, item){
        const entityEl = document.createElement('a-entity')
        entityEl.setAttribute('text', {
            font: 'exo2bold',
            align: 'center',
            width: 70,
            color: '#E65100',
            value: item.title
        })
        const elPosition = position;
        elPosition.y = -20
        entityEl.setAttribute('position', elPosition)
        entityEl.setAttribute("visible", true)
        return entityEl;
    }
})
