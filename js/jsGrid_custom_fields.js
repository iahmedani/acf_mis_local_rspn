var MyDateField = function (config) {
  jsGrid.Field.call(this, config);
};

MyDateField.prototype = new jsGrid.Field({

  css: "date-field",            // redefine general property 'css'
  align: "center",              // redefine general property 'align'


  sorter: function (date1, date2) {
    return new Date(date1) - new Date(date2);
  },

  itemTemplate: function (value) {
    return new Date(value).toDateString();
  },

  insertTemplate: function (value) {
    return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
  },

  editTemplate: function (value) {
    return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
  },

  insertValue: function () {
    return this._insertPicker.datepicker("getDate").toISOString();
  },

  editValue: function () {
    return this._editPicker.datepicker("getDate").toISOString();
  }
});
jsGrid.fields.date = MyDateField;

function FloatNumberField(config) {
  jsGrid.NumberField.call(this, config);
}

FloatNumberField.prototype = new NumberField({

  filterValue: function () {
    return parseFloat(this.filterControl.val());
  },

  insertValue: function () {
    return parseFloat(this.insertControl.val());
  },

  editValue: function () {
    return parseFloat(this.editControl.val());
  }
});

jsGrid.fields.floatNumber = FloatNumberField;