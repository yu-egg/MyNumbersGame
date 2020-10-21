'use strict'; //まずは 'use strict'; キーワードで厳密なエラーチェックをするように設定して、全体をブロックで囲っておくといいでしょう。
//今回のゲームですが、機能がわりと複雑なのでクラス構文を使っていきます
//完成版を見ると、ゲームの最初では、パネルは数字がない状態で pressed クラスがついているので、そういった li 要素を作ってあげれば良いでしょう。
{ 
  class Panel { //Panel クラスを作っていきましょう。
    constructor() {  //では、このあたりに Panel クラスを作ってあげて、コンストラクターの設定をしていきます。
      this.el = document.createElement('li');  //li 要素をプロパティとして持たせたいので、プロパティ名は、 element の el としてあげつつ、 document.createElement('li') としてあげればいいでしょう。
      this.el.classList.add('pressed');  //これで、 pressed クラスがついた li 要素を 4 つ持つボードができたので、続きは次回にしていきましょう。
    }
  }

  class Board { //まずはパネルを管理する Board クラスを作ってあげましょう。
    constructor(){  //コンストラクターを書いてあげて、ここでインスタンスを作っておいてあげます。
      this.panels = [];  //では、コンストラクターの処理ですが、パネルを管理したいので、とりあえずプロパティで配列として持っておきましょう。
      for (let i = 0; i < 4; i++) {  //そのうえで、パネルを 4 枚作りたいので、ループを回してあげましょう。
        this.panels.push(new Panel());  //では、どうするかというと、 this.panels に対してあとで作っていく Panel クラスのインスタンスを push() してあげればいいですね。
      }
    }
  }

  const board = new Board();  //const board = new Board(); でいいですね。
}