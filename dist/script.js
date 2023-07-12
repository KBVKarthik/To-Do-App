// --- Notes ---
// Just making a to-do app just for practice
// Pinspiration: https://dribbble.com/shots/3645124-iOS-Note-Taker

// - IDEAS -
// Make the add list button rotate and be the close button for the input
//     (Have the input slide in or something)
// Make the tasks draggable and organizable?

var app = new Vue({
    el: '#app',
    data: {
        lists: [
            {
                title: 'Test List 1',
                tasks: []
            },
            {
                title: 'Finish To-Do App',
                tasks: [
                    {title: 'Create sliding view thing', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Fix bug when lists is empty', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Create task entry view', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Create inputs for money and time/date', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Create check box and incomplete & complete states', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Add input for new lists', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Add list removal method', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Make a pop-up for list removal confirmation', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Create the list selection view', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Create animations for removing tasks', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Add an undo function to restore tasks that were accidentally removed (list removal will be a confirmation)', desc: '', cost: '', time: '', complete: true, deleted: false},
                    {title: 'Add display on click for the descriptions, money, and time for the tasks', desc: '', cost: '', time: '', complete: false, deleted: false},
                    {title: 'Add a way to make edits to tasks', desc: '', cost: '', time: '', complete: false, deleted: false}
                ]
            },
            {
                title: 'Test List 3',
                tasks: []
            },
        ],
        current_view: 1,
        current_list: 0,
        last_removed: [],
        timer: '',
        snackbar_active: false,
        snack_view: 0,
        selected_list: 0,
        list_entry: false,
        new_list: '',
        new_title: '',
        new_desc: '',
        cost_entry: false,
        new_cost: '',
        time_entry: false,
        new_time: ''
    },
    computed: {
        num_tasks: function() {
            return this.lists[this.current_list].tasks.length
        },
        num_left: function() {
            var output = 0;
            for(var i in this.lists[this.current_list].tasks) { 
                if(!this.lists[this.current_list].tasks[i].complete){ output++ };
            };
            return output;
        }
    },
    methods: {
        add_task: function() {
            // Title Check
            if(!this.new_title) {return false;} // Display to the user that there need to be a title
            
            var new_task = {
                title: this.new_title, 
                desc: this.new_desc, 
                cost: this.new_cost, 
                time: this.new_time, 
                complete: false, 
                deleted: false
            };
            
            this.lists[this.current_list].tasks.push( new_task ); 
            this.reset_variables();
            this.current_view = 2;
        },
        remove_task: function(index) { 
            this.last_removed = [this.lists[this.current_list].tasks[index], index, eval(this.current_list)];
            this.lists[this.current_list].tasks[index].deleted = true;
            // Letting animation play through
            setTimeout(function(){ 
                app.lists[app.current_list].tasks.splice(index,1); 
                app.snackbar_active = true;
            }, 300); 
            clearTimeout(this.timer);
            this.timer = setTimeout(function(){ app.snackbar_active = false; }, 8300);
        },
        undo_remove_task: function() {
            if(this.last_removed.length !== 0) {
                this.last_removed[0].deleted = false;
                this.lists[this.last_removed[2]].tasks.splice( this.last_removed[1], 0, this.last_removed[0] );  
                this.last_removed = [];
                clearTimeout(this.timer);
                this.snackbar_active = false;
            }
        },
        add_list: function(){
            var a = { title: this.new_list, tasks: [] };
            this.lists.push(a);
            this.new_list = '';
            this.list_entry = false;
        },
        remove_list: function() {
            this.snackbar_active = false;
            this.lists.splice(this.selected_list,1);
        },
        remove_list_snack: function(index) {
            this.snack_view = 0; 
            this.selected_list = index;
            this.snackbar_active = true;
            clearTimeout(this.timer);
        },
        reset_variables: function() {
            this.new_title = '';
            this.new_desc = '';
            this.cost_entry = false;
            this.time_entry = false;
            this.new_cost = '';
            this.new_time = '';
        }
    }
});