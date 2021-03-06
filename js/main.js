// Generated by CoffeeScript 1.6.2
(function() {
  var selection, waterfall;

  waterfall = function(options) {
    var $box, $item, $items, add_event, addfooter, df, i, j, k, pos, tops, v, _box_width, _height, _i, _j, _len, _num, _oheight, _owidth, _temp;

    options = options || {};
    df = {
      item: '.tweet',
      margin: 15,
      addfooter: true
    };
    for (k in df) {
      v = df[k];
      options[k] = v;
    }
    $box = document.querySelector('#waterfall');
    _box_width = $box.offsetWidth;
    $items = $box.querySelectorAll(options.item);
    _owidth = $items[0].offsetWidth + options.margin;
    _oheight = $items[0].offsetHeight;
    _num = Math.floor(_box_width / _owidth);
    pos = (function() {
      var _i, _results;

      _results = [];
      for (i = _i = 0; 0 <= _num ? _i < _num : _i > _num; i = 0 <= _num ? ++_i : --_i) {
        _results.push([i * _owidth, 0]);
      }
      return _results;
    })();
    add_event = function($item) {
      $item.addEventListener('mouseover', function() {
        return $item.className += ' hover';
      });
      return $item.addEventListener('mouseout', function() {
        var className;

        className = $item.className.replace(/hover|\s+/g, ' ');
        return $item.className = className.trim();
      });
    };
    for (_i = 0, _len = $items.length; _i < _len; _i++) {
      $item = $items[_i];
      _temp = 0;
      _height = $item.offsetHeight;
      for (j = _j = 0; 0 <= _num ? _j < _num : _j > _num; j = 0 <= _num ? ++_j : --_j) {
        if (pos[j][1] < pos[_temp][1]) {
          _temp = j;
        }
      }
      $item.style.cssText = "left: " + pos[_temp][0] + "px; top: " + pos[_temp][1] + "px;";
      pos[_temp][1] = pos[_temp][1] + _height + options.margin;
      add_event($item);
    }
    tops = (function() {
      var _k, _results;

      _results = [];
      for (i = _k = 0; 0 <= _num ? _k < _num : _k > _num; i = 0 <= _num ? ++_k : --_k) {
        _results.push(pos[i][1]);
      }
      return _results;
    })();
    tops.sort(function(a, b) {
      return a - b;
    });
    $box.style.height = "" + tops[_num - 1] + "px";
    addfooter = function(max) {
      var $clone, _k, _results;

      $item = document.createElement('div');
      $item.className = 'tweet additem';
      _results = [];
      for (i = _k = 0; 0 <= _num ? _k < _num : _k > _num; i = 0 <= _num ? ++_k : --_k) {
        if (max !== pos[i][1]) {
          $clone = $item.cloneNode();
          _height = max - pos[i][1] - options.margin;
          $clone.style.cssText = "left: " + pos[i][0] + "px; top: " + pos[i][1] + "px; height: " + _height + "px;";
          _results.push($box.appendChild($clone));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    if (options.addfooter) {
      return addfooter(tops[_num - 1]);
    }
  };

  waterfall();

  selection = function() {
    var $item, $items, _i, _len, _results;

    $items = document.querySelectorAll('#waterfall .tweet');
    _results = [];
    for (_i = 0, _len = $items.length; _i < _len; _i++) {
      $item = $items[_i];
      _results.push($item.addEventListener('click', function() {
        var className;

        className = this.className;
        if (/selected/.exec(className)) {
          className = className.replace(/selected|\s+/g, ' ');
        } else {
          className += ' selected';
        }
        return this.className = className.trim();
      }));
    }
    return _results;
  };

  selection();

}).call(this);
