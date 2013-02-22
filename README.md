graffiti
--
## なにこれ？
テキストファイルの内容をcanvasに書き出します。  
書き出される場所はランダムです。  

## 使い方？
### scriptタグそしてcanvasタグ
```
<script type="text/javascript" src="jquery.js"> </script >  
<script type="text/javascript" src="http://sakuratan.haxahaxa.info/js/graffiti.js"> </script >  
<canvas id="target" />  
```
### canvasに書く
```
var graffiti = Graffiti.getGraffiti('target');  
graffiti.draw('http://hoge.moge/piyo.fuga');  
```

### スクリーンショット
![Demo](https://raw.github.com/satanabe1/graffiti/master/pic/hello.png)

