//鍋データ
const recipes = [
    {
        name: "キムチ鍋",
        required: ["白菜", "豚肉", "キムチ"],
        optional: ["豆腐", "きのこ", "長ねぎ"],
        description: "ピリ辛で体が温まる鍋です。",
        image: "img/pot-kimchi.png"
    },
    {
        name: "寄せ鍋",
        required: ["白菜", "鶏肉", "豆腐"],
        optional: ["魚", "きのこ", "長ねぎ", "にんじん"],
        description: "いろいろな食材を楽しめる定番の鍋です。",
        image: "img/pot-yose.png"
    },
    {
        name: "豆乳鍋",
        required: ["白菜", "豚肉", "豆乳"],
        optional: ["豆腐", "きのこ", "長ねぎ"],
        description: "まろやかな豆乳スープを楽しむやさしい味の鍋です。",
        image: "img/pot-tonyu.png"
    },
    {
        name: "みそ魚鍋",
        required: ["白菜", "魚", "みそ"],
        optional: ["豆腐", "きのこ", "長ねぎ"],
        description: "魚のうま味とみその風味が楽しめる鍋です。",
        image: "img/pot-miso-fish.png"
    },
    {
        name: "鶏塩鍋",
        required: ["白菜", "鶏肉", "長ねぎ"],
        optional: ["豆腐", "きのこ", "にんじん"],
        description: "鶏肉のうま味を塩味で楽しむさっぱりした鍋です。",
        image: "img/pot-tori-shio.png"
    },
    {
        name: "豚しゃぶ鍋",
        required: ["白菜", "豚肉", "豆腐"],
        optional: ["きのこ", "長ねぎ", "にんじん"],
        description: "豚肉と野菜をさっと煮て楽しむ定番の鍋です。",
        image: "img/pot-buta-shabu.png"
    }
];
//--------------------------------------------------------------------------------------------------------前処理
//選択した食材を入れる箱・・・C
const selectedItems = [];

// 豚肉・鶏肉・魚が選択されているかを覚える箱をつくる
let isPorkSelected = false;
let isChickenSelected = false;
let isFishSelected = false;
let isCabbageSelected = false;
let isGreenOnionSelected = false;
let isMushroomSelected = false;
let isCarrotSelected = false;
let isTofuSelected = false;
let isKimchiSelected = false;
let isSoyMilkSelected = false;
let isMisoSelected = false;

//HTMLの「食材のボタン」を見つけて箱に入れる処理・・・A
const porkButton = document.querySelector("#porkButton");
const chickenButton = document.querySelector("#chickenButton");
const fishButton = document.querySelector("#fishButton");
const cabbageButton = document.querySelector("#cabbageButton");
const greenOnionButton = document.querySelector("#greenOnionButton");
const mushroomButton = document.querySelector("#mushroomButton");
const carrotButton = document.querySelector("#carrotButton");
const tofuButton = document.querySelector("#tofuButton");
const kimchiButton = document.querySelector("#kimchiButton");
const soyMilkButton = document.querySelector("#soyMilkButton");
const misoButton = document.querySelector("#misoButton");

//HTMLの「選択中：◯個」(#selectedCount)を見つけてselectedCountという箱に入れる処理・・・　B
const selectedCount = document.querySelector("#selectedCount");
// HTMLの「選んだ食材」を表示する場所(#selectedItemsText)を見つけて、selectedItemsTextという箱に入れる処理・・・D
const selectedItemsText = document.querySelector("#selectedItemsText");

//HTMLの「おすすめの鍋を見る」ボタンを見つけて箱に入れる
const searchButton = document.querySelector("#searchButton");

//HTMLの「リセット」ボタンを見つけて箱に入れる
const resetButton = document.querySelector("#resetButton");

//HTMLの「#selectionScreen」を見つけて箱に入れる
const selectionScreen = document.querySelector("#selectionScreen");

//HTMLの「#resultScreen」を見つけて箱に入れる
const resultScreen = document.querySelector("#resultScreen");

//冷蔵庫
const landingScreen = document.querySelector("#landingScreen");
const openFridgeButton = document.querySelector("#openFridgeButton");

//---------1位
//HTMLの「鍋」の場所を見つけて箱に入れる
const recipeNameText = document.querySelector("#recipeNameText");
//HTMLの「一致した必須食材」の場所を見つけて箱に入れる
const matchCountText = document.querySelector("#matchCountText");
//HTMLの「あと必要な食材」の場所を見つけて箱に入れる
const missingItemsText = document.querySelector("#missingItemsText");
//HTMLの「鍋イラスト」の場所を見つけて箱に入れる
const recipeImage = document.querySelector("#recipeImage");

//---------2位
const secondRecipeNameText = document.querySelector("#secondRecipeNameText");
const secondMatchCountText = document.querySelector("#secondMatchCountText");
const secondMissingItemsText = document.querySelector("#secondMissingItemsText");
const secondRecipeImage = document.querySelector("#secondRecipeImage");

//---------3位
const thirdRecipeNameText = document.querySelector("#thirdRecipeNameText");
const thirdMatchCountText = document.querySelector("#thirdMatchCountText");
const thirdMissingItemsText = document.querySelector("#thirdMissingItemsText");
const thirdRecipeImage = document.querySelector("#thirdRecipeImage");

// 食材の名前を、色付きのラベルとして画面へ表示する関数
function showIngredientLabels(element, items, labelType) {
    element.innerHTML = "";

    // 食材が1つもない場合は「なし」と表示する
    if (items.length === 0) {
        element.textContent = "なし";
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const label = document.createElement("span");
        label.textContent = items[i];
        label.classList.add("ingredientLabel", labelType);
        element.appendChild(label);
    }
}

// 選択画面の「選んだ食材」を、薄い緑のラベルで表示する
function updateSelectedItemsText() {
    if (selectedItems.length === 0) {
        selectedItemsText.textContent = "まだ選ばれていません";
    } else {
        showIngredientLabels(selectedItemsText, selectedItems, "ingredientLabel--available");
    }
}

//--------------------------------------------------------------------------------------------------------本処理

//Aで見つけた「豚肉ボタン」がクリックされたら、{ } の中を実行する
porkButton.addEventListener("click", function () {
    if (isPorkSelected === false) {
        // 豚肉が未選択なら、選択済み食材へ追加する
        selectedItems.push("豚肉");
        // 豚肉が選択済みであることを記録する
        isPorkSelected = true;
    }
    else {
        // 「豚肉」が選択された食材の何番目にあるかを調べporkIndexの箱に入れる
        const porkIndex = selectedItems.indexOf("豚肉");
        // 選択された食材から、porkIndexの位置にある食材を1つ削除する
        selectedItems.splice(porkIndex, 1);
        // 豚肉が未選択であることを記録する
        isPorkSelected = false;
    }

    // 豚肉が選択中ならporkButtonにis-selectedクラスを付け、未選択なら外す
    porkButton.classList.toggle("is-selected", isPorkSelected);

    //selectedCount(B)の箱の中にあるtextContentに「選択した食材を入れる箱」(C)にある食材の数を代入する。 .textContent：表示されている文字　.length：個数
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
chickenButton.addEventListener("click", function () {
    if (isChickenSelected === false) {
        selectedItems.push("鶏肉");
        isChickenSelected = true;
    }
    else {
        // 「鶏肉」が選択された食材の何番目にあるかを調べporkIndexの箱に入れる
        const chickenIndex = selectedItems.indexOf("鶏肉");
        // 選択された食材から、porkIndexの位置にある食材を1つ削除する
        selectedItems.splice(chickenIndex, 1);
        // 豚肉が未選択であることを記録する
        isChickenSelected = false;
    }

    chickenButton.classList.toggle("is-selected", isChickenSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
fishButton.addEventListener("click", function () {
    if (isFishSelected === false) {
        selectedItems.push("魚");
        isFishSelected = true;
    }
    else {
        // 「魚」が選択された食材の何番目にあるかを調べporkIndexの箱に入れる
        const fishIndex = selectedItems.indexOf("魚");
        // 選択された食材から、porkIndexの位置にある食材を1つ削除する
        selectedItems.splice(fishIndex, 1);
        // 豚肉が未選択であることを記録する
        isFishSelected = false;
    }

    fishButton.classList.toggle("is-selected", isFishSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
cabbageButton.addEventListener("click", function () {
    if (isCabbageSelected === false) {
        selectedItems.push("白菜");
        isCabbageSelected = true;
    }
    else {
        // 「白菜」が選択された食材の何番目にあるかを調べcabbageIndexの箱に入れる
        const cabbageIndex = selectedItems.indexOf("白菜");
        // 選択された食材から、cabbageIndexの位置にある食材を1つ削除する
        selectedItems.splice(cabbageIndex, 1);
        // 白菜が未選択であることを記録する
        isCabbageSelected = false;
    }

    cabbageButton.classList.toggle("is-selected", isCabbageSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
greenOnionButton.addEventListener("click", function () {
    if (isGreenOnionSelected === false) {
        selectedItems.push("長ねぎ");
        isGreenOnionSelected = true;
    } else {
        const greenOnionIndex = selectedItems.indexOf("長ねぎ");
        selectedItems.splice(greenOnionIndex, 1);
        isGreenOnionSelected = false;
    }

    greenOnionButton.classList.toggle("is-selected", isGreenOnionSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
mushroomButton.addEventListener("click", function () {
    if (isMushroomSelected === false) {
        selectedItems.push("きのこ");
        isMushroomSelected = true;
    } else {
        const mushroomIndex = selectedItems.indexOf("きのこ");
        selectedItems.splice(mushroomIndex, 1);
        isMushroomSelected = false;
    }

    mushroomButton.classList.toggle("is-selected", isMushroomSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
carrotButton.addEventListener("click", function () {
    if (isCarrotSelected === false) {
        selectedItems.push("にんじん");
        isCarrotSelected = true;
    } else {
        const carrotIndex = selectedItems.indexOf("にんじん");
        selectedItems.splice(carrotIndex, 1);
        isCarrotSelected = false;
    }

    carrotButton.classList.toggle("is-selected", isCarrotSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
tofuButton.addEventListener("click", function () {
    if (isTofuSelected === false) {
        selectedItems.push("豆腐");
        isTofuSelected = true;
    } else {
        const tofuIndex = selectedItems.indexOf("豆腐");
        selectedItems.splice(tofuIndex, 1);
        isTofuSelected = false;
    }

    tofuButton.classList.toggle("is-selected", isTofuSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
kimchiButton.addEventListener("click", function () {
    if (isKimchiSelected === false) {
        selectedItems.push("キムチ");
        isKimchiSelected = true;
    } else {
        const kimchiIndex = selectedItems.indexOf("キムチ");
        selectedItems.splice(kimchiIndex, 1);
        isKimchiSelected = false;
    }

    kimchiButton.classList.toggle("is-selected", isKimchiSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
soyMilkButton.addEventListener("click", function () {
    if (isSoyMilkSelected === false) {
        selectedItems.push("豆乳");
        isSoyMilkSelected = true;
    } else {
        const soyMilkIndex = selectedItems.indexOf("豆乳");
        selectedItems.splice(soyMilkIndex, 1);
        isSoyMilkSelected = false;
    }

    soyMilkButton.classList.toggle("is-selected", isSoyMilkSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});
misoButton.addEventListener("click", function () {
    if (isMisoSelected === false) {
        selectedItems.push("みそ");
        isMisoSelected = true;
    } else {
        const misoIndex = selectedItems.indexOf("みそ");
        selectedItems.splice(misoIndex, 1);
        isMisoSelected = false;
    }

    misoButton.classList.toggle("is-selected", isMisoSelected);
    selectedCount.textContent = selectedItems.length;

    updateSelectedItemsText();
});

//--------------------------------------------------------------------------------------------------------クリア
//Aで見つけた「おすすめの鍋を見る」がクリックされたら、{ } の中を実行する
searchButton.addEventListener("click", function () {
    // 全鍋の照合結果を入れる空のリスト
    const results = [];
    // rという変数を作り、recipesに入っている鍋を、最初から最後まで1つずつ確認する
    for (let r = 0; r < recipes.length; r++) {
        // 今確認している鍋のデータをrecipeという箱に入れる
        const recipe = recipes[r];
        // 今確認している鍋の一致数を数える箱。鍋ごとに0から始める・・・・・A
        let matchCount = 0;
        // 今確認している鍋で不足している必須食材を入れる空のリスト・・・・B
        let missingItems = [];
        // 今確認している鍋で一致した必須食材を入れる空のリスト
        let matchedItems = [];

        // 今確認している鍋の必須食材を、最初から最後まで1つずつ確認する
        for (let i = 0; i < recipe.required.length; i++) {
            // 今確認している必須食材をrequiredItemという箱に入れる
            const requiredItem = recipe.required[i];

            // ユーザーが選んだ食材に、今確認している必須食材が含まれていたら
            if (selectedItems.includes(requiredItem)) {
                // （ let matchCount = 0;で、最初は0だが）食材が一致したら+1する・・・A
                matchCount = matchCount + 1;
                // 一致した食材の名前をリストへ追加する
                matchedItems.push(requiredItem);
            } else {
                // 一致しなければ、不足食材のリストへ追加する・・・B
                missingItems.push(requiredItem);
            }
        }

        // 今確認している鍋の「あったらいい食材」を、最初から最後まで1つずつ確認する
        for (let i = 0; i < recipe.optional.length; i++) {
            // 今確認している「あったらいい食材」をoptionalItemという箱に入れる
            const optionalItem = recipe.optional[i];

            // ユーザーが選んだ食材に、その食材が含まれていたら
            if (selectedItems.includes(optionalItem)) {
                // 冷蔵庫から使える食材のリストへ追加する
                matchedItems.push(optionalItem);
            }
        }

        // 今確認した鍋の名前・一致数・不足食材を、resultsのリストへ追加する
        results.push({
            name: recipe.name,
            image: recipe.image,
            matchCount: matchCount,
            matchedItems: matchedItems,
            missingItems: missingItems
        });
    }

    // 結果を、一致数が多い順に並べ替える
    results.sort(function (a, b) {
        //数字が大きいものを先にするという指示
        return b.matchCount - a.matchCount;
    });

    console.log(results);

    //------1位を表示するコード------
    // 並べ替え後のresultsの0番目、つまり1位の照合結果をresultという箱に入れる
    const result = results[0];

    // 1位の鍋名を画面へ表示する
    recipeNameText.textContent = result.name;
    recipeImage.src = result.image;
    recipeImage.alt = result.name;
    // 1位の鍋で冷蔵庫から使える食材を緑のラベルで表示する
    showIngredientLabels(matchCountText, result.matchedItems, "ingredientLabel--available");
    // 1位の鍋で不足している必須食材を画面へ表示する
    showIngredientLabels(missingItemsText, result.missingItems, "ingredientLabel--missing");

    //------2位以下を表示するコード------

    // 並べ替え後のresultsの1番目、つまり2位の照合結果をsecondResultという箱に入れる
    const secondResult = results[1];

    // 2位の鍋名・冷蔵庫から使える食材・買う食材を画面へ表示する
    secondRecipeNameText.textContent = secondResult.name;
    secondRecipeImage.src = secondResult.image;
    secondRecipeImage.alt = secondResult.name;
    showIngredientLabels(secondMatchCountText, secondResult.matchedItems, "ingredientLabel--available");
    showIngredientLabels(secondMissingItemsText, secondResult.missingItems, "ingredientLabel--missing");

    // 並べ替え後のresultsの2番目、つまり3位の照合結果をthirdResultという箱に入れる
    const thirdResult = results[2];

    // 3位の鍋名・冷蔵庫から使える食材・買う食材を画面へ表示する
    thirdRecipeNameText.textContent = thirdResult.name;
    thirdRecipeImage.src = thirdResult.image;
    thirdRecipeImage.alt = thirdResult.name;
    showIngredientLabels(thirdMatchCountText, thirdResult.matchedItems, "ingredientLabel--available");
    showIngredientLabels(thirdMissingItemsText, thirdResult.missingItems, "ingredientLabel--missing");

    //表示・非表示
    selectionScreen.style.display = "none";
    resultScreen.style.display = "block";
});

// リセットボタンがクリックされたら、ページを再読み込みして初期状態に戻す　/ addEventListenerはクリック時の処理を登録するメソッド
resetButton.addEventListener("click", function () {
    window.location.reload();
});





//------------------------------------------------------------------------ 冷蔵庫
// 閉じた冷蔵庫がクリックされたら、表紙を隠して食材選択画面を表示する
openFridgeButton.addEventListener("click", function () {
    landingScreen.style.display = "none";
    selectionScreen.style.display = "block";
});
