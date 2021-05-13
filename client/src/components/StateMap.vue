<template>
<!-- Page displays Information about a particular state, and it's location on a map -->
    <div class="state-map">
        <h2>The state of {{ state.name }}</h2>
        <p v-if="state.visited">You have visited this state</p>
        <p v-else>You have not visited this state yet</p>

        <div id="map-container" v-if="dataReady">
            <l-map ref="map" v-on:ready="onMapReady" v-bind:center="mapCenter" v-bind:zoom="state.zoom">
                <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors">
                </l-tile-layer>
            </l-map>
        </div>
    </div>
</template>

<script>

import {LMap, LTileLayer} from '@vue-leaflet/vue-leaflet'

export default {
    name: 'StateMap',
    components: {
        LMap, LTileLayer
    },
    data() {
        return{
            state: {}, //State object, or a row in the database
            dataReady: false,
            mapReady: false
        }
    },
    mounted() {
        this.state.name = this.$route.params.state
        this.fetchStateData()
    },
    methods: {
        //Find data for a particular state, this will incule map lat and lon
        fetchStateData() {
            this.$stateService.getOneState(this.state.name).then( state => {
                this.state = state
                this.dataReady = true //Set ready state for data
            }).catch( err => {
                if(err.response && err.response.status === 404) {
                    this.state.name = '?'
                } else {
                    alert('Sorry, error fetching data about this state')
                    console.error(err)
                }
            })
        },
        onMapReady(){
            this.mapReady = true //Set ready state for map
        },
        setMapView() {
            if (this.mapReady && this.dataReady) {
                //Make map show correct part of world and zoom level
                this.$refs.map.leafletObject.setView(this.mapCenter, this.zoom)
            }
        }
    },
    computed: {
        mapCenter() {
            //Find the center of the map, with the lat and lon
            return [this.state.lat, this.state.lon]
        }
    }
}

</script>

<style scoped>
#map-container {

    height: 30rem;
    
}
</style>