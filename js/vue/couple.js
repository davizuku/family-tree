Vue.component('couple', {
    props: ['id', 'tree'],
    data: function() {
        return this.tree.couples[this.id];
    },
    computed: {
        startDate: function() {
            return formatDate(this.start)
        },
        endDate: function() {
            return formatDate(this.end)
        }
    },
    template: `
    <div class='couple'>
        <div class="card horizontal amber lighten-3 indigo-text text-darken-4">
            <div class="card-stacked">
                <div class="card-content">
                    <div class="row">
                        <span class="card-title">
                            <a v-bind:href="'?id=' + person1" class="indigo-text text-darken-4">
                            <person-basic v-bind:id=person1 v-bind:tree=tree></person-basic>
                            </a>
                            <i class="material-icons">link</i>
                            <a v-bind:href="'?id=' + person2" class="indigo-text text-darken-4">
                                <person-basic v-bind:id=person2 v-bind:tree=tree></person-basic>
                            </a>
                        </span>
                    </div>
                    <p v-if=startDate>Comienzo: {{startDate}}</p>
                    <p v-if=endDate>Fin: {{endDate}}</p>
                    <p v-if="descendants.length > 0">
                        Descendientes:
                        <div class="collection">
                            <a v-bind:href="'?id=' + personId" class="collection-item avatar amber lighten-4 indigo-text text-darken-4" v-for="personId in descendants">
                                <img v-bind:src="'https://picsum.photos/seed/' + personId + '/50'" alt="" class="circle">
                                <span class="title">
                                    <person-basic v-bind:id=personId v-bind:tree=tree></person-basic>
                                </span>
                            </a>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    <div>
    `
})
