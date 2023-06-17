var personBasic = {
    props: ['id', 'tree'],
    data: function() {
        return this.tree.persons[this.id];
    },
    computed: {
        fullName: function() {
            var elems = []
            if (this.name != null) {
                elems.push(this.name)
            }
            if (this.surname1 != null) {
                elems.push(this.surname1)
            }
            if (this.surname2 != null) {
                elems.push(this.surname2)
            }
            return elems.join(' ');
        }
    },
    template: `<span class='person-basic'>{{fullName}}</span>`
}
var personDetail = {
    extends: personBasic,
    computed: {
        birthDate: function() {
            return formatDate(this.birth)
        },
        birthPlace: function() {
            return this.birth?.place ?? ""
        },
        deathDate: function() {
            return formatDate(this.death)
        },
        deathPlace: function() {
            return this.death?.place ?? ""
        },
        hasCouples: function() {
            return this.couples.length > 0
        },
        couplePartners: function() {
            var partnerIds = {}
            for (index in this.couples) {
                if (this.couples.hasOwnProperty(index)) {
                    var coupleId = this.couples[index]
                    var couple = this.tree.couples[coupleId]
                    if (couple == null) {
                        console.log(couple, coupleId)
                    }
                    partnerIds[coupleId] = couple.person1 == this.id ?
                        couple.person2 :
                        couple.person1;
                }
            }
            return partnerIds
        }
    },
    template: `
    <div class='person-detail'>
        <div class="card horizontal amber lighten-3 indigo-text text-darken-4">
            <div class="card-stacked">
                <div class="card-content">
                    <div class="row">
                        <div class="col m6 l4">
                            <img class="responsive-img" v-bind:src="'https://picsum.photos/seed/' + id + '/400'">
                        </div>
                        <div class="col m6 l8">
                            <span class="card-title">{{fullName}}</span>
                            <p>Fecha de nacimiento: {{birthDate}}</p>
                            <p>Lugar de nacimiento: {{birthPlace}}</p>
                            <p v-if=deathDate>Fecha de defunción: {{deathDate}}</p>
                            <p v-if=deathPlace>Lugar de defunción: {{deathPlace}}</p>
                            <div v-if="hasCouples">
                                <p>Parejas:</p>
                                <div class="collection">
                                    <a v-bind:href="'?id=' + coupleId" class="collection-item avatar amber lighten-4 indigo-text text-darken-4" v-for="(partnerId, coupleId) in couplePartners">
                                        <img v-bind:src="'https://picsum.photos/seed/' + partnerId + '/50'" alt="" class="circle">
                                        <span class="title">
                                            <person-basic v-bind:id=partnerId v-bind:tree=tree></person-basic>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="parents" class="card-action">
                    <a v-bind:href="'?id=' + parents" class="indigo-text text-darken-4">
                        <i class="tiny material-icons">arrow_back</i>
                        Progenitores
                    </a>
                </div>
            </div>
        </div>
    </div>
    `
}
Vue.component('person-basic', personBasic)
Vue.component('person-detail', personDetail)
