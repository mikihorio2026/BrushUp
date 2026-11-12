//Aで見つけた「おすすめの鍋を見る」がクリックされたら、{ } の中を実行する
searchButton.addEventListener("click", function () {
    const results = [];
    for (let r = 0; r < recipes.length; r++) {
        const currentRecipe = recipes[r];
        console.log(currentRecipe.name);
    }

    //recipes という配列の0番目のデータを取り出して、recipe という変数に入れる。
    const recipe = recipes[0];

    //matchCount という変数を作り、数値の0を入れる。
    let matchCount = 0;

    //missingItems という変数を作り、空の配列を入れる。
    let missingItems = [];

    //i という変数を作り、0を入れる。
    //i が recipe の required 配列の要素数より小さい間、{ } の中の処理を繰り返す。
    //1回処理するたびに、i に1を足す。
    for (let i = 0; i < recipe.required.length; i++) {

        //recipe の required 配列の i 番目の値を requiredItem に入れる。
        const requiredItem = recipe.required[i];
        //ユーザーが選んだ食材の中に、今確認している必要食材が含まれていたら、一致数（matchCount）を1増やす/machCount++は「1を足す」
        if (selectedItems.includes(requiredItem)) {
            matchCount++;
        }
        else {
            //missingItemsという箱に「この鍋を作るために、まだ足りない必須食材」を入れる
            missingItems.push(requiredItem);
        }
    }
    console.log(matchCount);
    console.log(missingItems);
    //recipeNameTextは鍋名を表示する場所　.textcontentはその場所に表示する文字　
    //recipeNameText というHTMLタグの中の文字（.textContent）に、recipe の name を代入する
    recipeNameText.textContent = recipe.name;
    //matchCountText というHTMLタグの中の文字（.textContent）に、一致した食材の数（matchCount）を代入する
    matchCountText.textContent = matchCount;
    //missingItemsText というHTMLタグの中の文字（.textContent）に、不足している食材のリスト（missingItems）を代入する
    missingItemsText.textContent = missingItems;
});
