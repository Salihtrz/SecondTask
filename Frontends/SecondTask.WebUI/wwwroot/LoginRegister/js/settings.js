document.addEventListener('DOMContentLoaded', () => {
    // İlk resim yükleme kısmı
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.querySelector('.newaccount-image img');
    const chooseButton = document.querySelector('.newaccount-choose-btn');

    if (chooseButton) {
        chooseButton.addEventListener('click', () => {
            imageInput.click(); // Tıklama input'u açar
        });

        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0]; // Seçilen dosyayı al
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result; // Resmi <img> içine koy
                };
                reader.readAsDataURL(file); // Dosyayı oku
            }

            // Dosya seçildikten sonra input'u sıfırla
            imageInput.value = '';
        });
    }

    // İkinci resim yükleme kısmı
    const editimageInput = document.getElementById('file-upload');
    const editimagePreview = document.querySelector('.editaccount-grid-thumbnail-container img');
    const editchooseButton = document.querySelector('.custom-file-upload');

    // Dosya yükleme butonuna tıklanırsa
    if (editchooseButton) {
    editchooseButton.addEventListener('click', () => {
        editimageInput.click(); // Tıklama input'u açar
    });

    // Dosya seçildiğinde
    editimageInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Seçilen dosyayı al
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                editimagePreview.src = e.target.result; // Resmi <img> içine koy
            };
            reader.readAsDataURL(file); // Dosyayı oku
        }

        // Dosya seçildikten sonra input'u sıfırla, tekrar aynı dosya seçilemiyor
        editimageInput.value = ''; // Burada input'u sıfırlıyoruz.
    });
}


    // Anahtar kelime seçimi kısmı
    const selectElement = document.getElementById('keywords');
    const textareaElement = document.getElementById('selected-keywords');
    const selectedKeywordsContainer = document.getElementById('selected-keywords-container');

    if (selectElement) {
        selectElement.addEventListener('change', () => {
            const selectedValue = selectElement.value;

            if (selectedValue) {
                // Add keyword to textarea
                const newTag = document.createElement('div');
                newTag.classList.add('keyword-tag');
                newTag.innerHTML = `${selectedValue} <span class="remove">×</span>`;
                selectedKeywordsContainer.appendChild(newTag);

                // Update textarea value
                const keywords = Array.from(selectedKeywordsContainer.children).map(tag => tag.textContent.replace('×', '').trim());
                textareaElement.value = keywords.join(', ');

                // Disable selected option
                const optionToDisable = Array.from(selectElement.options).find(option => option.value === selectedValue);
                optionToDisable.disabled = true;
                optionToDisable.style.color = '#c2c2c2';

                // Clear select value
                selectElement.value = '';

                // Add remove functionality
                newTag.querySelector('.remove').addEventListener('click', () => {
                    // Remove the tag
                    selectedKeywordsContainer.removeChild(newTag);

                    // Enable the option again
                    optionToDisable.disabled = false;
                    optionToDisable.style.color = '#555';

                    // Update textarea value
                    const updatedKeywords = Array.from(selectedKeywordsContainer.children).map(tag => tag.textContent.replace('×', '').trim());
                    textareaElement.value = updatedKeywords.join(', ');
                });
            }
        });
    }
});
