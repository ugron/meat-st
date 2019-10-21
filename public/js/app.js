
     console.log('Client side Javascript');

    // fetch API
    // fetch('http://puzzle.mead.io/puzzle').then( (res) => {  // get random text
        
    //     res.json().then( (data) => {
    //         console.log(data);
    //     })
    // });  


// challenge fetch API weather
    // fetch('http://localhost:3000/weather?address=tokyo').then( (res) => {
        
    //     // return res.json();
    //     // })
    //     res.json().then ( (dataJson) => {
    //         if (dataJson.err) {
    //             console.log(dataJson.err);
    //         } 
    //         else {
    //             // console.log(dataJson);
    //             console.log(dataJson.location);
    //             console.log(dataJson.forecast);
    //         }   
    //     });

    // });

    //    '../img/Beef-kaburi300.jpg'

    // input field submit event
    // const weatherForm = document.querySelector('form');
    // const searchTxt = document.querySelector('input');
    // const message1 = document.querySelector('#message-1'); // p id = message-1
    // const message2 = document.querySelector('#message-2'); // p id = message-2

    // // message1.textContent = 'mes1';
    // // message2.textContent = 'mes2';

    // form 入力を submit したら実行するイベント処理
    // weatherForm.addEventListener('submit', (e) => {
        
    //     e.preventDefault(); // <form> のデフォルトアクション（submit でページをリロード）を無効化 

    //     const location = searchTxt.value; // = input に入力した値（テキスト）
    //     // input に入力した値（テキスト）をコンソール
    //     if (location === '') {
    //         alert('type location')
    //         console.log(`type location`);
    //     } else {
    //         console.log(location);

    //         // p html の初期化
    //         message1.textContent = 'Loading...';
    //         message2.textContent = '';

    //         // input(searchTxt) に入力した値（テキスト）を fetch API URL に代入
    //         // fetch(`http://localhost:3000/weather?address=${location}`).then( (res) => {
    //         // => 
    //         fetch(`/weather?address=${location}`).then( (res) => { // for heroku 
            
    //             res.json().then ( (dataJson) => {
    //                 if (dataJson.err) { // request( { url: locationURL, json: true}, (err, { body }) => { の err がある場合
    //                     // console.log(dataJson.err);
    //                     message1.textContent = dataJson.err;
    //                 } 
    //                 else {
    //                     // console.log(dataJson);
    //                     // console.log(dataJson.location);
    //                     // console.log(dataJson.forecast);

    //                     message1.textContent = dataJson.location;
    //                     // message2.textContent = dataJson.forecast;
    //                     message2.textContent = dataJson.customText;
    //                 }   
    //             });

    //         });
    //     }
    // }); // weatherForm.addEventListener() END


    // // APIからJSONを取得する
    // fetch('./api/v1/list')
    // .then((response) => response.json())
    // .then((todoList) => {
    //     // id="todo-container"要素を取得する
    //     const todoContainer = document.querySelector('#todo-container');

    //     // コンテナの中身を全部消す
    //     todoContainer.innerHTML = '';

    //     // JSONの各要素に対して
    //     for(const item of todoList) {
    //         const li = document.createElement('li');          // リスト要素
    //         const label = document.createElement('label');    // ラベル
    //         const checkbox = document.createElement('input'); // チェックボックス
    //         checkbox.type = 'checkbox';
    //         checkbox.checked = item.done;                     // 項目がdoneならチェック
    //         const text = new Text(item.title);                // 項目名

    //         // ラベルにチェックボックスとテキストを追加する
    //         label.appendChild(checkbox);
    //         label.appendChild(text);

    //         // リスト要素に先ほどのラベルを追加する
    //         li.appendChild(label);

    //         // TODOリストにリスト要素を追加する
    //         todoContainer.appendChild(li);
    //     }
    // });


// meat-stock 
    
    // load Event ページ再読込（更新）時 のロードイベント
    window.addEventListener('load', (e) => {

        // API から  json data を読み込み
        fetch('/api/v1/stockData').then( (res) => res.json() )
            .then( (dataJson) => {
                // console.log(dataJson); // arrMeatData: Array(9)

                // #meatstock-container の要素を取得
                const meatContainer = document.querySelector('#meatstock-container');

                // #meatstock-container の中身 HTML を削除
                meatContainer.innerHTML = '';
                // console.log(dataJson[0].html);
                // HTML 要素を追加  insertAdjacentHTML... https://developer.mozilla.org/ja/docs/Web/API/Element/insertAdjacentHTML
                meatContainer.insertAdjacentHTML('afterend', dataJson[0].html);
                
                const arrTitle = dataJson.map( (el) => el.title);
                    // console.log(arrTitle);

                // document.querySelector(`#title-${dataJson[1].IdName}`).textContent = 'Test title Print';
                // console.log(dataJson.length); // 10
                
                // title を dataJson より 抽出してHTML 表示
                for (i = 1; i < dataJson.length; i++) {
                    document.querySelector(`#title-${dataJson[i].IdName}`).textContent = dataJson[i].title;
                }

                // 在庫量 kg ALL初期値    toFixed() ... 数を固定小数点表記でフォーマット
                // const node_defaultWeight = document.querySelectorAll('.default_weight') // // nodeList 
                // console.log(node_defaultWeight[0].textContent);
                // HTML に 初期値 arrMeatData[i].sumVolume を HTMLに代入
                // node_defaultWeight.forEach( (cur, i) => cur.textContent = dataJson[i].sumVolume.toFixed(1) ); // exp... 1.0

                // 在庫数 の更新 = dataJson[i].stockを代入
                const updateStock = (data) => {
                    const node_defaultStock = document.querySelectorAll('.default_stock'); // nodeList 
                    node_defaultStock.forEach( (cur, i) => cur.textContent = data[i+1].stock);
                }
                updateStock(dataJson);


                // const node_defaultStock = document.querySelectorAll('.default_stock'); // nodeList 
                // node_defaultStock.forEach( (cur, i) => cur.textContent = dataJson[i+1].stock);

                // 残り kg数の算出する関数  return ?.? kg
                const calc_leftWeight = (volume, stock) => {
                    const fixedWeight_kg = volume / 1000;
                    // console.log(fixedWeight_kg);
                    return (fixedWeight_kg * stock).toFixed(1); // toFixed() ... 数を固定小数点表記でフォーマット
                }  

                // 残りの合計ストック kg数を算出する関数 return totalStockVol ?.? kg
                const getSumStockVol = (data) => {
                    // html 要素 dataJson[0] を排除した arrObj
                    const arrDataObj = data.filter( (el) => el.sumVolume >= 0);
                        // console.log(arrDataObj);
                    // .sumVolume の値のみを格納した配列を作成 (parseFloat() で string 文字列 -> num )
                    let arrSumVol = arrDataObj.map( (el) => parseFloat(el.sumVolume) );
                    // const arrSumVol = arrDataObj.map( (el) => parseInt(el.sumVolume).toFixed(1) );
                        // console.log(arrSumVol); // 
                    //
                    let totalStockVol = 0;

                    arrSumVol.forEach( (cur) => {
                        return totalStockVol += cur
                    });
                        // console.log(totalStockVol);
                        return totalStockVol;
                }
                // 残りの合計ストック kg数を算出 関数を呼び出し 
                // const leftStockVol = getSumStockVol(dataJson);
                // console.log(typeof( leftStockVol )); // num

                // // id="totalStock" に 残りKg leftStockVol を表示(更新する)関数
                const updateSumStock = (vol) => {
                    // console.log(vol)
                    const totalStockEl = document.querySelector('#totalStock');
                    totalStockEl.textContent = vol; 
                }
                


                // 在庫量 kg の更新     toFixed() ... 数を固定小数点表記でフォーマット
                const updateStockVol = (data) => {
                    const node_defaultWeight = document.querySelectorAll('.default_weight') // // nodeList 
                    // HTML に 初期値 arrMeatData[i].sumVolume を HTMLに代入
                    node_defaultWeight.forEach( (cur, i) => cur.textContent = calc_leftWeight(data[i+1].volume, data[i+1].stock) ); 
                }
                updateStockVol(dataJson);

                // const node_defaultWeight = document.querySelectorAll('.default_weight') // // nodeList 
                // // HTML に 初期値 arrMeatData[i].sumVolume を HTMLに代入
                // node_defaultWeight.forEach( (cur, i) => cur.textContent = calc_leftWeight(dataJson[i+1].volume, dataJson[i+1].stock) ); 


                // データ読込みボタン (.btn-loadData) クリック時のイベント
                document.querySelector('.btn-loadData').addEventListener('click', () => {
                    // ローカルストレージに key= "updateData" で 保存した JSON文字列 dataJson を取得
                    const getStrData = localStorage.getItem('updateData');
                    const jsonData = JSON.parse(getStrData);
                        console.log(jsonData);

                    // 在庫数 の更新 = jsonData[i].stockを代入  
                    updateStock(jsonData);
                    // 在庫量 kg の更新 
                    updateStockVol(jsonData);
                    // 残りの合計ストック kg数を更新
                    // 残りの合計ストック kg数を算出 関数を呼び出し 
                    let leftStockVol = getSumStockVol(jsonData); // return totalStockVol
                    // id="totalStock" 残りKg leftStockVol を更新
                    updateSumStock(leftStockVol); 
                });


                //ボタン(.btn-dec) & (.btn-add) クリック時のイベント
                const decBtnEl = document.querySelectorAll('.btn-dec'); // node-list
                const addBtnEl = document.querySelectorAll('.btn-add'); // node-list

                // ボタン クリックに対応した要素のIDを取得する関数
                const getTargetId = (el) => el.target.closest('div div').id;

                // 各 ー ボタン(.btn-dec)クリック時のイベント
                decBtnEl.forEach( (cur, i) => {
                    cur.addEventListener('click', (e) => {
                        // console.log(e.target);
                        // const targetStockEl = e.target.closest('div div');
                        const id = getTargetId(e)
                        // console.log(id); // exp... kataR_300
                        const stockEl_Id = `stock_${id}`;
                        // console.log(stockEl_Id); // exp... stock_kataR_300
                        const targetStockEl = document.querySelector(`#${stockEl_Id}`);
                        // console.log(targetStockEl.textContent);
                        const targetStWeightEl = document.querySelector(`#weight_${id}`);

                        // 在庫(id="stock_") 数 0以上ならマイナス１
                        if (dataJson[i+1].stock > 0) {
                            // obj data (dataJson[].stock) を更新   // parseInt() .. 文字列を数字に変換
                            dataJson[i+1].stock = parseInt(targetStockEl.textContent) - 1;
                            // HTML に反映 クリック舞に-1
                            targetStockEl.textContent = dataJson[i+1].stock;
                            // 在庫量 kg の更新 // obj data (dataJson[].sumVolume) を更新
                            dataJson[i+1].sumVolume = calc_leftWeight(dataJson[i+1].volume, dataJson[i+1].stock)
                            // HTML に反映 クリック舞にkg 減少
                            targetStWeightEl.textContent = dataJson[i+1].sumVolume;
                            
                            // 残りの合計ストック kg数を更新
                              // 残りの合計ストック kg数を算出 関数を呼び出し 
                              let leftStockVol = getSumStockVol(dataJson); // return totalStockVol
                              // id="totalStock" 残りKg leftStockVol を更新
                              updateSumStock(leftStockVol);

                        }
                    });
                });


                // 各 + ボタン(.btn-add)クリック時のイベント
                addBtnEl.forEach( (cur, i) => {
                    cur.addEventListener('click', (e) => {
                        // console.log(e.target);
                        // const targetStockEl = e.target.closest('div div');
                        const id = getTargetId(e)
                        // console.log(id); // exp... kataR_300
                        const stockEl_Id = `stock_${id}`;
                        // console.log(stockEl_Id); // exp... stock_kataR_300
                        const targetStockEl = document.querySelector(`#${stockEl_Id}`);
                        // console.log(targetStockEl.textContent);
                        const targetStWeightEl = document.querySelector(`#weight_${id}`);

                        // 在庫(id="stock_") 数 クリックごとに＋１
                        // obj data (dataJson[].stock) を更新   // parseInt() .. 文字列を数字に変換
                        dataJson[i+1].stock = parseInt(targetStockEl.textContent) + 1;
                        // HTML に反映 クリック舞に+1 
                        targetStockEl.textContent = dataJson[i+1].stock;
                        // 在庫量 kg の更新 // obj data (dataJson[].sumVolume) を更新
                        dataJson[i+1].sumVolume = calc_leftWeight(dataJson[i+1].volume, dataJson[i+1].stock)
                        // HTML に反映 クリック舞にkg 増加
                        targetStWeightEl.textContent = dataJson[i+1].sumVolume;
                            // console.log(dataJson);

                        // 残りの合計ストック kg数を更新
                              // 残りの合計ストック kg数を算出 関数を呼び出し 
                              let leftStockVol = getSumStockVol(dataJson); // return totalStockVol
                              // id="totalStock" 残りKg leftStockVol を更新
                              updateSumStock(leftStockVol);
                    });
                });

                // データ保存ボタン (.btn-dataSave) クリック時のイベント
                document.querySelector('.btn-dataSave').addEventListener('click', () => {
                    // console.log(dataJson);
                    // ローカルストレージに key= "updateData" で JSON文字列に変換した dataJson を保存
                    localStorage.setItem('updateData', JSON.stringify(dataJson) );

                    // let jsonStrData = localStorage.getItem('updateData');
                    // // // console.log(jsonStrData);
                    // let jsonData = JSON.parse(jsonStrData); // = dataJson
                    // console.log(jsonData);

                });

                
                
                
            }); 
    
    }); // window event END

    

    //ボタン(.btn-dec) & (.btn-add) クリック時のイベント

    // const decBtnEl = document.querySelectorAll('.btn-dec'); // node-list
    // const addBtnEl = document.querySelectorAll('.btn-add'); // node-list

    // 各ボタンの要素 (.btn-dec) & (.btn-add)
    // const arrBtnQuery = dataJson.map( (data) => {
    //     return {
    //         decBtnQuery : document.querySelector(`#btn-dec_${data.IdName}`),
    //         addBtnQuery : document.querySelector(`#btn-add_${data.IdName}`),

    //         stockQuery : document.querySelector(`#stock_${data.IdName}`),
    //         weightQuery : document.querySelector(`#weight_${data.IdName}`),
    //     } 
    // });
        //  console.log(arrBtnQuery);


        // const testEl = document.getElementById('btn-dec_kataR_300'); 
        // console.log('testEl')

        // testEl.addEventListener('click', () => {
        //     console.log('testEl')
        // })
        
        
        
    //  ー ボタン(.btn-dec)クリック時のイベント
    // for (i = 0; i <= decBtnEl.length; i++) {
        
    // }  
    

    
    // for (i = 1; i <= arrBtnQuery.length; i++) {
    //     arrBtnQuery[i].decBtnQuery.addEventListener('click', (e) => {
    //         console.log(e.target); 
            

    //         // 在庫(id="stock_") 要素
    //         // const stockEl = e.target;
    
            // // 在庫(id="stock_") 数 0以上ならマイナス１
            // if (arrBtnQuery[i].stockQuery.textContent > 0) {
            //     // obj data (dataJson[].stock) を更新   // parseInt() .. 文字列を数字に変換
            //     dataJson[i].stock = parseInt(arrBtnQuery[i].stockQuery.textContent) - 1;
            //     // HTML に反映 クリック舞に-1
            //     arrBtnQuery[i].stockQuery.textContent = dataJson[i].stock ; 
            // }
            // console.log(dataJson[i])
    
            // 在庫量 残りKg数の計算 -> HTML表示 更新
        //     const leftKg = calc_leftWeight(dataJson[i].volume, dataJson[i].stock);
        // //     // console.log(`残り ${leftKg} kg`) 
    
        //         // obj data (dataJson[i]).sumVolume の更新
        //         dataJson[i].sumVolume = leftKg;
        //         // 残りKg HTML表示 更新
        //         arrBtnQuery[i].weightQuery.textContent = dataJson[i].sumVolume;
    
        // });
    
    // }


    

   

    //  const arrMeatData = [
    //     {
    //         title: '一番育ち 肩ロース肉 しゃぶしゃぶ用 300g',
    //         // name: 'pork_KataR_300',
    //         IdName: 'kataR_300',
    //         volume: 300,
    //         stock: 10,
    //         sumVolume: 3
    //     },
    //     {
    //         title: '米澤豚一番育ち肩ローススライス500g',
    //         // name: 'pork_KataR_500',
    //         IdName: 'kataR_500',
    //         volume: 500,
    //         stock: 10,
    //         sumVolume: 5
    //     },
    //     {
    //         title: '国産あらびき極旨ウインナー たっぷり1kg',
    //         // name: 'Wiener_1kg',
    //         IdName: 'wiener_1kg',
    //         volume: 1000,
    //         stock: 10,
    //         sumVolume: 10
    //     },
    //     {
    //         title: '桜姫もも肉 1kg',
    //         // name: 'Wiener_1kg',
    //         IdName: 'toriMomo_1kg',
    //         volume: 1000,
    //         stock: 10,
    //         sumVolume: 10
    //     },
    //     {
    //         title: '国産黒毛和牛 さばき和牛すじ 600g',
    //         // name: 'Wiener_1kg',
    //         IdName: 'beef_gyusuji_600',
    //         volume: 600,
    //         stock: 10,
    //         sumVolume: 6
    //     },
    //     {
    //         title: '国産黒毛和牛 霜降り切り落とし 1kg',
    //         // name: 'Wiener_1kg',
    //         IdName: 'beef_kiriotoshi_1kg',
    //         volume: 1000,
    //         stock: 10,
    //         sumVolume: 10
    //     },
    //     {
    //         title: '国産黒毛和牛 肩ロースカルビ焼用 450g',
    //         // name: 'Wiener_1kg',
    //         IdName: 'beef_kataR_450',
    //         volume: 450,
    //         stock: 10,
    //         sumVolume: 4.5
    //     },
    //     {
    //         title: '国産黒毛和牛 カルビ焼用 500g',
    //         // name: 'Wiener_1kg',
    //         IdName: 'beef_karubi_500',
    //         volume: 500,
    //         stock: 10,
    //         sumVolume: 5
    //     },
    //     {
    //         title: '国産黒毛和牛 かぶり切り落とし 300g',
    //         // name: 'Wiener_1kg',
    //         IdName: 'beef_kaburi_300',
    //         volume: 300,
    //         stock: 10,
    //         sumVolume: 3
    //     },
    // ];

    // console.log(arrMeatData.length); // 9


    // const MeatStockSt = () => {

    // IdName のみを格納した配列
    // const arrIdName = arrMeatData.map( (data) => data.IdName );  //  ["kataR_300", "kataR_500", "wiener_1kg"]
    // console.log(arrIdName); //  ["kataR_300", "kataR_500", "Wiener_1kg"]

// title elements
    // const titleEl = {
    //     KataR_300: document.querySelector('#title-kataR_300'),
    //     KataR_500: document.querySelector('#title-kataR_500'),
    //     Wiener_1kg: document.querySelector('#title-wiener_1kg'),
    // }

    
    // // h4 title を obj data よりHTML 表示
    // // document.querySelector('#title-kataR_300').textContent = arrMeatData[0].title;
    // document.querySelector('#title-kataR_300').textContent = arrMeatData[0].title;
    // document.querySelector('#title-kataR_500').textContent = arrMeatData[1].title;
    // document.querySelector('#title-wiener_1kg').textContent = arrMeatData[2].title;

    

// Button elements
    // const btn_decEl =  {
    //     KataR_300: document.querySelector('#btn-dec_kataR_300'),
    //     KataR_500: document.querySelector('#btn-dec_kataR_500'),
    //     Wiener_1kg: document.querySelector('#btn-dec_wiener_1kg'),

    // }


    // const btn_addEl = {
    //     KataR_300: document.querySelector('#btn-add_kataR_300'),
    //     KataR_500: document.querySelector('#btn-add_kataR_500'),
    //     Wiener_1kg: document.querySelector('#btn-add_wiener_1kg'),
    // }

    // ======= > stock 
    // const stock_El = {
    //     KataR_300: document.querySelector('#stock_kataR_300'),
    //     KataR_500: document.querySelector('#stock_kataR_500'),
    //     Wiener_1kg: document.querySelector('#stock_wiener_1kg'),
    // }

    // // // // 在庫数 ALL初期値 = arrMeatData[i].stockを HTMLに代入
    // const node_defaultStock = document.querySelectorAll('.default_stock'); // nodeList 

    // node_defaultStock.forEach( (cur, i) => cur.textContent = arrMeatData[i].stock);
        

    // < ======= stock   

    // ======= > weight 
    // const weight_El = {
    //     KataR_300: document.querySelector('#weight_kataR_300'),
    //     KataR_500: document.querySelector('#weight_kataR_500'),
    //     Wiener_1kg: document.querySelector('#weight_wiener_1kg'),
    // }

    // // 在庫量 kg ALL初期値    toFixed() ... 数を固定小数点表記でフォーマット
    // const node_defaultWeight = document.querySelectorAll('.default_weight') // // nodeList 
    // // HTML に 初期値 arrMeatData[i].sumVolume を HTMLに代入
    // node_defaultWeight.forEach( (cur, i) => cur.textContent = arrMeatData[i].sumVolume.toFixed(1) ); // exp... 1.0
    
    

    // < ======= weight 

//ボタン(.btn-dec) & (.btn-add) クリック時のイベント

    // arrIdName = ["kataR_300", "kataR_500", "wiener_1kg"]
    // const decBtnQuery = document.querySelector(`#btn-dec_${arrIdName[0]}`);
    // const addBtnQuery = document.querySelector(`#btn-decc_${arrIdName[0]}`);

    // const stockQuery = document.querySelector(`#stock_${arrIdName[0]}`);
    // const weightQuery = document.querySelector(`#weight_${arrIdName[0]}`);

    // 残り kg数の算出する関数  return ?.? kg
    // const calc_leftWeight = (volume, stock) => {
    //     const fixedWeight_kg = volume / 1000;
    //     // console.log(fixedWeight_kg);
    //     return (fixedWeight_kg * stock).toFixed(1); // toFixed() ... 数を固定小数点表記でフォーマット
    // }
    
    // const pork = leftWeight(500, 10);
    //     console.log(`pork left ${pork} kg`); // pork left 5.0 kg

    // const arrTitle = arrMeatData.map( (el) => el.title);
        // console.log(arrTitle); // ["一番育ち 肩ロース肉 しゃぶしゃぶ用 300g", "米澤豚一番育ち肩ローススライス500g", "国産あらびき極旨ウインナー たっぷり1kg"]
    
    // const arrBtnQuery = arrIdName.map( (cur) => {
    //     return {
    //        decBtnQuery : document.querySelector(`#btn-dec_${cur}`),
    //        addBtnQuery : document.querySelector(`#btn-add_${cur}`),

    //        stockQuery : document.querySelector(`#stock_${cur}`),
    //        weightQuery : document.querySelector(`#weight_${cur}`),
    //     }
        
    // });

    // console.log(arrBtnQuery); // array object
    // console.log(arrBtnQuery.length); // 3
    // console.log(arrBtnQuery[0].decBtnQuery)

    // console.log(arrBtnQuery[0].stockQuery.textContent) // true 5 > 0

     

    // for (let i = 0; i <= arrBtnQuery.length; i++) {
        
    //     // title を obj data よりHTML 表示
    //     arrTitle.forEach( (cur, i) => {
    //         document.querySelector(`#title-${arrMeatData[i].IdName}`).textContent = cur;
    //     })
    //     // document.querySelector('#title-kataR_300').textContent = arrMeatData[i].title;
    //     // document.querySelector('#title-kataR_500').textContent = arrMeatData[i].title;
    //     // document.querySelector('#title-wiener_1kg').textContent = arrMeatData[i].title;

    //     // => -, + ボタンクリック時のイベント  
    //     // ー ボタン(.btn-dec)クリック時のイベント  
    //     arrBtnQuery[i].decBtnQuery.addEventListener('click', (e) => {
    //         // console.log(e.target); 
    
    //         // 在庫(id="stock_") 数 0以上ならマイナス１
    //         if (arrBtnQuery[i].stockQuery.textContent > 0) {
    //             // obj data (arrMeatData[].stock) を更新   // parseInt() .. 文字列を数字に変換
    //             arrMeatData[i].stock = parseInt(arrBtnQuery[i].stockQuery.textContent) - 1;
    //              // HTML に反映 クリック舞に-1
    //              arrBtnQuery[i].stockQuery.textContent = arrMeatData[i].stock ; 
    //         }
    //         // console.log(arrMeatData[i])
    
    //         // 在庫量 残りKg数の計算 -> HTML表示 更新
    //         const leftKg = calc_leftWeight(arrMeatData[i].volume, arrMeatData[i].stock);
    //     //     // console.log(`残り ${leftKg} kg`) 
    
    //             // obj data (arrMeatData[i]).sumVolume の更新
    //             arrMeatData[i].sumVolume = leftKg;
    //             // 残りKg HTML表示 更新
    //             arrBtnQuery[i].weightQuery.textContent = arrMeatData[i].sumVolume;
    
    //     });

    //     // ＋ ボタンクリック時のイベント
    //     arrBtnQuery[i].addBtnQuery.addEventListener('click', (e) => {
    //         // console.log(e.target); 
    //             // obj data (arrMeatData[].stock) を更新   // parseInt() .. 文字列を数字に変換
    //             arrMeatData[i].stock = parseInt(arrBtnQuery[i].stockQuery.textContent) + 1;
    //             // HTML に反映 クリック舞に+1
    //             arrBtnQuery[i].stockQuery.textContent = arrMeatData[i].stock ; 
                
    
    //         // 在庫量 残りKg数の計算 -> HTML表示 更新
    //         const leftKg = calc_leftWeight(arrMeatData[i].volume, arrMeatData[i].stock);
    //     //     // console.log(`残り ${leftKg} kg`) 
    
    //             // obj data (arrMeatData[i]).sumVolume の更新
    //             arrMeatData[i].sumVolume = leftKg;
    //             // 残りKg HTML表示 更新
    //             arrBtnQuery[i].weightQuery.textContent = arrMeatData[i].sumVolume;

    //             // console.log(arrMeatData[i]);
    
    //     });

    // }
    
    
// }


    // KataR_300 の ー ボタンクリック時のイベント
    // btn_decEl.KataR_300.addEventListener('click', (e) => {
    //     // console.log(typeof( stock_El.KataR_300.textContent)); // string
    //     // console.log(stock_val.KataR_300); // 5
    //     // console.log(typeof( stock_val.KataR_300)); // number

    //     // 在庫(id="stock_KataR_300") 数 0以上ならマイナス１
    //     if (stock_val.KataR_300 > 0) {
    //         stock_val.KataR_300 -= 1 ;

    //     }
    //     // HTML に反映 クリック舞に-1
    //     stock_El.KataR_300.textContent = stock_val.KataR_300;
    //     // obj のストック数 を更新
    //     pork_KataR_300.stock = stock_val.KataR_300;

    //     console.log(pork_KataR_300.stock);

    //     // 残りKg数の計算 -> HTML表示 更新
    //     const leftKg = calc_leftWeight(pork_KataR_300.volume, pork_KataR_300.stock);
    //     // console.log(`残り ${leftKg} kg`) 
    //     // obj.sumVolume の更新
    //     pork_KataR_300.sumVolume = leftKg;
    //     // 残りKg HTML表示 更新
    //     weight_El.KataR_300.textContent = pork_KataR_300.sumVolume;


    //     console.log(pork_KataR_300);

    // });

    
    // arrIdName.forEach( (cur) => {  //  ["kataR_300", "kataR_500", "Wiener_1kg"]

    //     const btnQuery = document.querySelector(`#btn-dec_${cur}`);

    //     btnQuery.addEventListener('click', (e) => {
    //         console.log('decBtn clicked')

    //         // console.log(typeof( stock_El.cur.textContent)); // string
    //         // console.log(stock_val.cur); // 5
    //         // console.log(typeof( stock_val.cur)); // number
    
    //         // 在庫(id="stock_cur") 数 0以上ならマイナス１
    //         if (stock_val.cur > 0) {
    //             stock_val.cur -= 1 ;
    
    //         }
    //         // HTML に反映 クリック舞に-1
    //         stock_El.cur.textContent = stock_val.cur;
    //         // obj のストック数 を更新
    //         pork_cur.stock = stock_val.cur;
    
    //         console.log(pork_cur.stock);
    
    //         // 残りKg数の計算 -> HTML表示 更新
    //         const leftKg = calc_leftWeight(pork_cur.volume, pork_cur.stock);
    //         // console.log(`残り ${leftKg} kg`) 
    //         // obj.sumVolume の更新
    //         pork_cur.sumVolume = leftKg;
    //         // 残りKg HTML表示 更新
    //         weight_El.cur.textContent = pork_cur.sumVolume;
    
    
    //         console.log(pork_cur);
    
    //     });
    // })


    // // KataR_300 の ＋ ボタンクリック時のイベント
    // btn_addEl.KataR_300.addEventListener('click', (e) => {

    //     // console.log(typeof( stock_El.KataR_300.textContent)); // string
    //     // console.log(stock_val.KataR_300); // 5
    //     // console.log(typeof( stock_val.KataR_300)); // number

    //     // 在庫(id="stock_KataR_300") 数 +１
    //         stock_val.KataR_300 += 1 ;

    //     // HTML に反映 クリック舞に+1
    //     stock_El.KataR_300.textContent = stock_val.KataR_300;
    //     // obj のストック数 を更新
    //     pork_KataR_300.stock = stock_val.KataR_300;

    //     console.log(pork_KataR_300.stock);

    //     // 残りKg数の計算 -> HTML表示 更新
    //     const leftKg = calc_leftWeight(pork_KataR_300.volume, pork_KataR_300.stock);
    //     // console.log(`残り ${leftKg} kg`) 
    //     // obj.sumVolume の更新
    //     pork_KataR_300.sumVolume = leftKg;
    //     // 残りKg HTML表示 更新
    //     weight_El.KataR_300.textContent = pork_KataR_300.sumVolume;

    //     console.log(pork_KataR_300);

    // });


    


    // *** 要 API から取得 ***
    // parseInt() .. 文字列を数字に変換
