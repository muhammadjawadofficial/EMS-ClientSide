<template>
<div>
    <b-button class="add-button" @click="editDegree('new')" variant="primary">Add Education</b-button>
    <div class="card">
        <div class="card-body">
            <b-table primary-key="id" sort-by="id" :tbody-transition-props="tableTransition" sort-icon-left responsive striped hover :busy="busy" :items="educations" :fields="tableEducationFields">
                <template v-slot:cell(degrees)="data">
                    {{data.item.degrees.length}}
                </template>

                <template v-slot:cell(actions)="data">
                    <a @click="editDegree(data.item.id)"><i class="far fa-edit"></i></a>
                    <a @click="deleteDegree(data.item.id)"><i class="fas fa-trash"></i></a>
                </template>

                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
            </b-table>
        </div>
    </div>
</div>
</template>

<script>
import UserService from '@/services/user.service'
import {
    adminPanelTableTransition
} from '@/constants'
export default {
    data() {
        return {
            educations: null,
            tableEducationFields: [{
                key: 'id',
                label: '#',
                'class': 'width10 text-indent text-center',
                sortable: true
            }, {
                key: 'degreeLevel',
                label: 'Degree Level',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'degrees',
                label: 'No. of Degrees',
                'class': 'text-indent',
                sortable: true
            }, {
                key: 'actions',
                label: 'Actions',
                'class': 'width15 text-center'
            }],
            busy: true,
            tableTransition: adminPanelTableTransition,
        }
    },
    mounted() {
        this.getDegreeLevels();
    },
    methods: {
        async getDegreeLevels() {
            const response = await UserService.getDegreeLevels();

            if (!response || !response.data.success) {
                this.$toasted.global.error()
                this.$router.push({
                    name: 'admin404'
                })
            } else {
                this.educations = response.data.data
                this.busy = false
            }
        },
        editDegree(degreeLevelId) {
            this.$router.push({
                path: 'editEducation/' + degreeLevelId
            })
        },
        async deleteDegree(degreeLevelId){
            const response = await UserService.deleteDegree(degreeLevelId)
            if(response)
                {
                    this.$toasted.global.success({message: 'Degree Deleted Successfully'})
                    this.getDegreeLevels();
                }
        }
    }
}
</script>
