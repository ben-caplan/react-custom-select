'use strict';

/*
 *  CUSTOM SELECT
 *  
 *  This component creates a fully customizable (and CSS style-able) `<select>` element.
 *  
 *  @use:
 *  <CustomSelect id="string(optional)" name="string(optional)" placeholder="string(optional)" value="string" options=[{label:'string', value:'string'}, ...] />
 */
var CustomSelect = React.createClass({
  getInitialState : function(){
    return{
      options : this.props.options || {},
      value : this.props.value || '',
      placeholder : this.props.placeholder || ''
    };
  },
  _onChange : function(e){
    this.setState({value : this.props.options[e.target.selectedIndex].label});
  },
  render : function(){
    //Scoped variables
    var value = this.state.value;
    var options = this.state.options.map(function(option, i){
      if(option.value == value) return <option value={option.value}>{option.label || option.value}</option>;
      else return <option selected value={option.value}>{option.label || option.value}</option>;
    });
    if( value == '' ) value = options[0].value || (this.state.placeholder || '');

    return (
      <div className="custom-select">
        <div className={"display-copy" + (!this.state.value != '' ? ' empty' : '')}>{value}</div>
        <select name={this.props.name} id={this.props.id || this.props.name} className="styled-select" onChange={this._onChange}>
          { 
            options.map(function(option, i){
              return (<SelectOption selected={value && value==option.value} label={option.label} value={option.value} />);
            })
          }
        </select>
      </div>
    );
  }
});

module.exports = CustomSelect;
