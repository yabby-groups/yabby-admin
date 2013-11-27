waterfall = (options) ->
  options = options or {}
  df =
    item: '.tweet'
    margin: 15
    addfooter: true

  for k, v of df
    options[k] = v

  $box = document.querySelector '#waterfall'
  _box_width = $box.offsetWidth
  $items = $box.querySelectorAll options.item
  _owidth = $items[0].offsetWidth + options.margin
  _oheight = $items[0].offsetHeight
  _num = Math.floor _box_width/_owidth

  pos = for i in [0..._num]
    [i * _owidth, 0]

  add_event = ($item) ->
    $item.addEventListener 'mouseover', () ->
      $item.className += ' hover'
    $item.addEventListener 'mouseout', () ->
      className = $item.className.replace /hover|\s+/g, ' '
      $item.className = className.trim()

  for $item in $items
    _temp = 0
    _height = $item.offsetHeight

    for j in [0..._num]
      if pos[j][1] < pos[_temp][1]
        _temp = j

    $item.style.cssText = "left: #{pos[_temp][0]}px; top: #{pos[_temp][1]}px;"
    pos[_temp][1] = pos[_temp][1] + _height + options.margin
    add_event $item

  tops = for i in [0..._num]
    pos[i][1]
  tops.sort (a, b) ->
    a - b
  $box.style.height = "#{tops[_num-1]}px"

  addfooter = (max) ->
    $item = document.createElement 'div'
    $item.className = 'tweet additem'
    for i in [0..._num]
      if max isnt pos[i][1]
        $clone = $item.cloneNode()
        _height = max - pos[i][1] - options.margin
        $clone.style.cssText = "left: #{pos[i][0]}px; top: #{pos[i][1]}px; height: #{_height}px;"
        $box.appendChild($clone)

  addfooter tops[_num-1] if options.addfooter

waterfall()

selection = () ->
  $items = document.querySelectorAll '#waterfall .tweet'
  for $item in $items
    $item.addEventListener 'click', () ->
      className = @className
      if /selected/.exec(className)
        className = className.replace /selected|\s+/g, ' '
      else
        className += ' selected'

      @className = className.trim()

selection()
