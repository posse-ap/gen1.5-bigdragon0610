(function () {
  "use strict";

  var vm = new Vue({
    el: "#app",
    data: {
      newItem: "",
      todos: [],
      editingTitles: [],
    },
    watch: {
      todos: {
        handler: function () {
          localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        deep: true,
      },
    },
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    },
    methods: {
      addItem: function () {
        var item = {
          title: this.newItem,
          idDone: false,
          editing: false,
        };
        this.todos.push(item);
        this.newItem = "";
      },
      editItem: function (index) {
        this.editingTitles[index] = this.todos[index].title;
        this.todos[index].editing = true;
      },
      saveItem: function (index) {
        this.todos[index].editing = false;
      },
      cancelSaving: function (index) {
        this.todos[index].title = this.editingTitles[index];
        this.editingTitles[index] = "";
        this.todos[index].editing = false;
      },
      deleteItem: function (index) {
        if (confirm("are you sure?")) {
          this.todos.splice(index, 1);
        }
      },
      purge: function () {
        if (!confirm("delete finished?")) {
          return;
        }
        this.todos = this.remaining;
      },
    },
    computed: {
      remaining: function () {
        return this.todos.filter(function (todo) {
          return !todo.isDone;
        });
      },
    },
  });
})();
