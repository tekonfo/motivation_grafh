// https://blog.asial.co.jp/2018/09/14/SVG%E3%82%92%E7%94%BB%E5%83%8F%E5%8C%96%E3%81%99%E3%82%8B
export function svg2png(svgElement, sucessCallback, errorCallback) {
  var canvas = document.createElement('canvas');
  canvas.width = svgElement.width.baseVal.value;
  canvas.height = svgElement.height.baseVal.value;
  var ctx = canvas.getContext('2d');
  var image = new Image;
  
  image.onload = () => {
    // SVGデータをPNG形式に変換する
    ctx.drawImage(image, 0, 0, image.width, image.height);
    sucessCallback(canvas.toDataURL());
  };
  image.onerror = (e) => {
    errorCallback(e);
  };
  // SVGデータを取り出す
  var svgData = new XMLSerializer().serializeToString(svgElement);
  image.src = 'data:image/svg+xml;charset=utf-8;base64,' + base64EncodeUnicode(svgData);
  return image.src
}

function base64EncodeUnicode(str) {
  // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters, 
  // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
  const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode('0x' + p1);
  });

  return btoa(utf8Bytes);
}

// 使い方
// svg2png(document.getElmentById('motivationGraphSvg'), function(data) {
//     // data: JPEGのbase64形式データ（文字列）
//     console.log(data)
// }, function(error) {
//     // error: 何らかのエラーオブジェクト  
//     console.log(error)
// })