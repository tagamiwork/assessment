'use strict ';//　厳格モードを使う…宣言後の記述ミスをエラー表示する機能を呼び出す

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**指定したHTML要素の子要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 * 
 */
function removeAllChildren(element) {
    while (element.firstChild) {//子要素があれば、削除
        element.removeChild(element.firstChild);
    }//while
}//removeAllChildren

//assessmentButton.onclick = function(){ //無名関数の書きかた
assessmentButton.onclick = () => { //無名関数簡略ver（アロー関数）の書きかた
    const userName = userNameInput.value;
    //ガード句　…　フィルター的な役割
    if (userName.length === 0) {//名前が空の時はこの関数終了
        return;
    }//if

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    //constは不変定数だが、const.プロパティ名 は再代入OK
    const header = document.createElement('h3'); //まずタグを作成
    header.innerText = '診断結果'; //後からタグの中身を設定
    resultDivided.appendChild(header); //divの中に入れる

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    //　ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')//URI エンコード
        + '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href' ,hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text' ,result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
   
};//assessmentButton onclick

userNameInput.onkeydown = function (event) {
  if (event.key === 'Enter') {
      // ボタンのonclick() 処理呼び出し
    assessmentButton.onclick();
  } //if 
};//userNameInput onkeydown


//　マルチカーソル…Ctrl + Alt + ↓　
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

//　JSDoc 形式のコメントの書き方
/**名前の文字列を渡すと診断結果を返す関数
 * 
 * @param {string} userName ユーザの名前 
 * @return {string} 診断結果
 */
function assessment(userName) {
    //　全文字のコード番号を取得してそれらを足す
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }//for

    //　文字のコード番号の合計を回数の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    // {userName}を入力文字に書き換える
    result = result.replace(/\{userName\}/g ,userName);
    /*正規表現について

    正規表現とは … 文字検索のこと。/で囲む。
    ※今回は、{userName}を検索したい。
    しかし、｛｝は特別な記号。ゆえにエスケープ\必要
    g　…　グローバルサーチ。文字列全体に対してマッチングするか
            （無指定の場合は1度マッチングした時点で処理を終了）

    */

    return result;
}//assessment




//テストを行う機能関数
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。'//trueの時の値
    ,'診断結果の特定の部分を名前に置き換える処理が正しくありません。'//folseの時の表示
);
console.assert(
    assessment('太郎') === assessment('太郎')
    ,'入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
