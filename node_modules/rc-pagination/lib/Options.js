'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var React = require('react');
var KEYCODE = require('./KeyCode');

var Options = function (_React$Component) {
  _inherits(Options, _React$Component);

  function Options(props) {
    _classCallCheck(this, Options);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      current: props.current,
      _current: props.current
    };

    ['_handleChange', '_changeSize', '_go', '_buildOptionText'].forEach(function (method) {
      return _this[method] = _this[method].bind(_this);
    });
    return _this;
  }

  Options.prototype._buildOptionText = function _buildOptionText(value) {
    return value + ' ' + this.props.locale.items_per_page;
  };

  Options.prototype._changeSize = function _changeSize(value) {
    this.props.changeSize(Number(value));
  };

  Options.prototype._handleChange = function _handleChange(evt) {
    var _val = evt.target.value;

    this.setState({
      _current: _val
    });
  };

  Options.prototype._go = function _go(e) {
    var _val = e.target.value;
    if (_val === '') {
      return;
    }
    var val = Number(this.state._current);
    if (isNaN(val)) {
      val = this.state.current;
    }
    if (e.keyCode === KEYCODE.ENTER) {
      var c = this.props.quickGo(val);
      this.setState({
        _current: c,
        current: c
      });
    }
  };

  Options.prototype.render = function render() {
    var _this2 = this;

    var props = this.props;
    var state = this.state;
    var locale = props.locale;
    var prefixCls = props.rootPrefixCls + '-options';
    var changeSize = props.changeSize;
    var quickGo = props.quickGo;
    var buildOptionText = props.buildOptionText || this._buildOptionText;
    var Select = props.selectComponentClass;
    var changeSelect = null;
    var goInput = null;

    if (!(changeSize || quickGo)) {
      return null;
    }

    if (changeSize && Select) {
      (function () {
        var Option = Select.Option;
        var pageSize = props.pageSize || props.pageSizeOptions[0];
        var options = props.pageSizeOptions.map(function (opt, i) {
          return React.createElement(
            Option,
            { key: i, value: opt },
            buildOptionText(opt)
          );
        });

        changeSelect = React.createElement(
          Select,
          {
            prefixCls: props.selectPrefixCls,
            showSearch: false,
            className: prefixCls + '-size-changer',
            optionLabelProp: 'children',
            dropdownMatchSelectWidth: false,
            value: pageSize.toString(),
            onChange: _this2._changeSize
          },
          options
        );
      })();
    }

    if (quickGo) {
      goInput = React.createElement(
        'div',
        { className: prefixCls + '-quick-jumper' },
        locale.jump_to,
        React.createElement('input', {
          type: 'text',
          value: state._current,
          onChange: this._handleChange,
          onKeyUp: this._go
        }),
        locale.page
      );
    }

    return React.createElement(
      'div',
      { className: '' + prefixCls },
      changeSelect,
      goInput
    );
  };

  return Options;
}(React.Component);

Options.propTypes = {
  changeSize: React.PropTypes.func,
  quickGo: React.PropTypes.func,
  selectComponentClass: React.PropTypes.func,
  current: React.PropTypes.number,
  pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
  pageSize: React.PropTypes.number,
  buildOptionText: React.PropTypes.func,
  locale: React.PropTypes.object
};

Options.defaultProps = {
  pageSizeOptions: ['10', '20', '30', '40']
};

module.exports = Options;