<template>
    <div>
        <!-- Display summary information about the number of states visited -->
        <p>There are {{states.length}} states</p>
        <p>You have vised {{totalVisited}} {{units}}</p>

        <p v-if="areAllVisited">You have visited all the states, and DC!</p>
    </div>
</template>

<script>

export default {
    name: 'StateSummary',
    props: {
        states: Array
    },
    computed: {
        //Count the total states visited
        totalVisited() {
            let visitedCount = 0 
            this.states.forEach( state => {
                if (state.visited) {
                    visitedCount++
                }
            })
            return visitedCount
        },
        //Find out if the prompt should display 'state' or 'states'
        units() {
            if (this.totalVisited == 1) {
                return 'state'
            } else {
                return 'states'
            }
        },
        //Check to see if all states are visited
        areAllVisited() {
            return this.totalVisited === this.states.length

        }
    }
}

</script>

<style scoped>

#all-visited-message {
    font-weight: 600;
}


</style>
