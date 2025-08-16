window.addEventListener('load', function () {
  const content = document.querySelector('.yourVideos-content');
  const pageNavbar = document.querySelector('.page-navbar');
  const customizationHeader = document.querySelector('.customization-header');
  const videosPage = document.querySelector('.videos-page');
  const postsPage = document.querySelector('.posts-page');
  const playlistsPage = document.querySelector('.playlists-page');
  const videoEditPage = document.querySelector('.video-edit-page');
  const videoCommentPage = document.querySelector('.video-comment-page');
  const postEditPage = document.querySelector('.post-edit-page');
  const playlistEditPage = document.querySelector('.playlist-edit-page');
  const playlistVideosPage = document.querySelector('.playlist-videos-page');
  const dashboardPage = document.querySelector('.dashboard-page');
  const postCommentPage = document.querySelector('.post-comment-page');
  const customizationPage = document.querySelector('.customization-page');

  // Navbar'ın yüksekliğini alıyoruz
  const navbarHeight = document.querySelector('.yourVideos-navbar').offsetHeight;

  // Sidebar'ı alıyoruz
  const sidebar = document.querySelector('.yourVideos-sidebar');
  const sidebarWidth = sidebar.offsetWidth;

  // Sidebar'ın top değerini navbar'ın yüksekliğine göre ayarlıyoruz
  sidebar.style.marginTop = navbarHeight + 'px';
  content.style.marginLeft = (sidebarWidth + 25) + 'px';
  content.style.marginTop = (navbarHeight + 30) + 'px';

  if (videosPage || postsPage || playlistsPage) {
    content.style.marginLeft = sidebarWidth + 'px';
  }
  if (dashboardPage) {
    content.style.marginLeft = (sidebarWidth + 30) + 'px';
  }
  if (videoEditPage || videoCommentPage || postEditPage || playlistEditPage || playlistVideosPage || postCommentPage || customizationPage) {
    content.style.marginLeft = sidebarWidth + 'px';
    content.style.marginTop = navbarHeight + 'px';
  }

  if (pageNavbar) {
    pageNavbar.style.top = navbarHeight + 'px';
  }
  
  if (customizationHeader) {
    customizationHeader.style.top = navbarHeight + 'px';
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const editPostPage = document.querySelectorAll('.post-edit-page');
  const editPlaylistPage = document.querySelectorAll('.playlist-edit-page');

  // Common dropdown elements and event listeners (moved from outside page-specific blocks)
  const dropdownButton3 = document.getElementById('sortDropdown');
  const dropdownOptions3 = document.getElementById('sortOptions');
  const dropdownButton4 = document.getElementById('playlistVisibilityDropdown');
  const dropdownOptions4 = document.getElementById('playlistVisibilityOptions');

  document.addEventListener('click', (event) => {
    if (dropdownButton3 && dropdownOptions3 && !dropdownButton3.contains(event.target) && !dropdownOptions3.contains(event.target)) {
      dropdownOptions3.classList.add('hidden');
    }
    if (dropdownButton4 && dropdownOptions4 && !dropdownButton4.contains(event.target) && !dropdownOptions4.contains(event.target)) {
      dropdownOptions4.classList.add('hidden');
    }
  });

  if (dropdownButton3) {
    dropdownButton3.addEventListener('click', (event) => {
      event.preventDefault();
      dropdownOptions3.classList.toggle('hidden');
    });
  }
  if (dropdownButton4) {
    dropdownButton4.addEventListener('click', (event) => {
      event.preventDefault();
      dropdownOptions4.classList.toggle('hidden');
    });
  }

  if (editPostPage.length > 0) {
    const saveButton = document.querySelector('.page-navbar-actions .yourVideos-btn:nth-of-type(1)');
    const deleteButton = document.querySelector('.page-navbar-actions .yourVideos-btn:nth-of-type(2)');

    const actions = document.querySelectorAll('.post-edit-page input, .post-edit-page select, .post-edit-page textarea');

    let initialValues;

    function checkFormChanges() {
      console.log('Post Edit: checkFormChanges called.');
      let hasChanges = false;
      if (!initialValues) {
        console.log('Post Edit: initialValues not yet captured. Exiting checkFormChanges.');
        return;
      }
      actions.forEach((input, index) => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          if (input.checked !== initialValues[index]) {
            hasChanges = true;
            console.log(`Post Edit: Change detected in checkbox/radio: ${input.name}, New: ${input.checked}, Old: ${initialValues[index]}`);
          }
        } else {
          if (input.value !== initialValues[index]) {
            hasChanges = true;
            console.log(`Post Edit: Change detected in input/textarea/select: ${input.id || input.name}, New: ${input.value}, Old: ${initialValues[index]}`);
          }
        }
      });

      console.log('Post Edit: Final hasChanges value:', hasChanges);

      if (saveButton) {
        console.log('Post Edit: saveButton exists.');
        saveButton.disabled = !hasChanges;
        console.log('Post Edit: saveButton disabled state set to:', saveButton.disabled);
      }

      if (deleteButton) {
        console.log('Post Edit: deleteButton exists.');
        deleteButton.disabled = !hasChanges;
        if (!deleteButton.disabled) {
          deleteButton.style.backgroundColor = '#000';
          deleteButton.style.color = '#fff';
          deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.backgroundColor = '#282828';
          });
          deleteButton.addEventListener('mouseout', () => {
            deleteButton.style.backgroundColor = '#000';
          });
        } else {
          deleteButton.style.backgroundColor = '#f4f3f3';
          deleteButton.style.color = '#999';
        }
        console.log('Post Edit: deleteButton disabled state set to:', deleteButton.disabled);
      }
    }

    setTimeout(() => {
      initialValues = Array.from(actions).map(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          return input.checked;
        } else {
          return input.value;
        }
      });
      console.log('Post Edit: Initial values captured:', initialValues);

      if (saveButton) {
        saveButton.disabled = true;
        console.log('Post Edit: Initial saveButton disabled:', saveButton.disabled);
      }
      if (deleteButton) {
        deleteButton.disabled = true;
        console.log('Post Edit: Initial deleteButton disabled:', deleteButton.disabled);
      }
      checkFormChanges();
    }, 50);

    actions.forEach(input => {
      input.addEventListener('input', checkFormChanges);
      input.addEventListener('change', checkFormChanges);
    });

    deleteButton.addEventListener('mouseover', () => {
      // deleteButton.style.backgroundColor = '#282828';
      // deleteButton.style.color = 'white';
    });

    deleteButton.addEventListener('mouseout', () => {
      // deleteButton.style.backgroundColor = '#000';
      // deleteButton.style.color = '#fff';
    });
  }

  if (editPlaylistPage.length > 0) {
    const saveButton = document.querySelector('.page-navbar-actions .yourVideos-btn:nth-of-type(1)');
    const deleteButton = document.querySelector('.page-navbar-actions .yourVideos-btn:nth-of-type(2)');

    const actions = document.querySelectorAll('.playlist-edit-page input, .playlist-edit-page select, .playlist-edit-page textarea');
    const visibilityValue = document.getElementById('visibilityValue');
    const sortValue = document.getElementById('sortValue');

    let initialValues;
    let initialSelectedVisibilityValue;
    let initialSelectedSortValue;

    function checkFormChanges() {
      console.log('Playlist Edit: checkFormChanges called.');
      let hasChanges = false;
      if (!initialValues) {
        console.log('Playlist Edit: initialValues not yet captured. Exiting checkFormChanges.');
        return;
      }

      actions.forEach((input, index) => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          if (input.checked !== initialValues[index]) {
            hasChanges = true;
            console.log(`Playlist Edit: Change detected in checkbox/radio: ${input.name}, New: ${input.checked}, Old: ${initialValues[index]}`);
          }
        } else {
          if (input.value !== initialValues[index]) {
            hasChanges = true;
            console.log(`Playlist Edit: Change detected in input/textarea/select: ${input.id || input.name}, New: ${input.value}, Old: ${initialValues[index]}`);
          }
        }
      });

      let currentVisibilityText = visibilityValue && visibilityValue.firstChild && visibilityValue.firstChild.nodeType === Node.TEXT_NODE ? visibilityValue.firstChild.textContent.trim() : '';
      if (currentVisibilityText !== initialSelectedVisibilityValue) {
        hasChanges = true;
        console.log(`Playlist Edit: Change detected in Visibility dropdown: New: ${currentVisibilityText}, Old: ${initialSelectedVisibilityValue}`);
      }

      let currentSortText = sortValue && sortValue.firstChild && sortValue.firstChild.nodeType === Node.TEXT_NODE ? sortValue.firstChild.textContent.trim() : '';
      if (currentSortText !== initialSelectedSortValue) {
        hasChanges = true;
        console.log(`Playlist Edit: Change detected in Sort dropdown: New: ${currentSortText}, Old: ${initialSelectedSortValue}`);
      }

      console.log('Playlist Edit: Final hasChanges value:', hasChanges);

      if (saveButton) {
        console.log('Playlist Edit: saveButton exists.');
        saveButton.disabled = !hasChanges;
        console.log('Playlist Edit: saveButton disabled state set to:', saveButton.disabled);
      } else {
        console.log('Playlist Edit: saveButton not found.');
      }

      if (deleteButton) {
        console.log('Playlist Edit: deleteButton exists.');
        deleteButton.disabled = !hasChanges;
        if (!deleteButton.disabled) {
          deleteButton.style.backgroundColor = '#000';
          deleteButton.style.color = '#fff';
          deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.backgroundColor = '#282828';
          });
          deleteButton.addEventListener('mouseout', () => {
            deleteButton.style.backgroundColor = '#000';
          });
        } else {
          deleteButton.style.backgroundColor = '#f4f3f3';
          deleteButton.style.color = '#999';
        }
        console.log('Playlist Edit: deleteButton disabled state set to:', deleteButton.disabled);
      } else {
        console.log('Playlist Edit: deleteButton not found.');
      }
    }

    setTimeout(() => {
      initialValues = Array.from(actions).map(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          return input.checked;
        } else {
          return input.value;
        }
      });

      initialSelectedVisibilityValue = visibilityValue && visibilityValue.firstChild && visibilityValue.firstChild.nodeType === Node.TEXT_NODE ? visibilityValue.firstChild.textContent.trim() : '';
      initialSelectedSortValue = sortValue && sortValue.firstChild && sortValue.firstChild.nodeType === Node.TEXT_NODE ? sortValue.firstChild.textContent.trim() : '';
      console.log('Playlist Edit: Initial values captured:', {initialValues, initialSelectedVisibilityValue, initialSelectedSortValue});

      if (saveButton) {
        saveButton.disabled = true;
        console.log('Playlist Edit: Initial saveButton disabled:', saveButton.disabled);
      }
      if (deleteButton) {
        deleteButton.disabled = true;
        console.log('Playlist Edit: Initial deleteButton disabled:', deleteButton.disabled);
      }
      checkFormChanges();
    }, 50);

    actions.forEach(input => {
      input.addEventListener('input', checkFormChanges);
      input.addEventListener('change', checkFormChanges);
    });

    const visibilityOptions = document.querySelectorAll(".playlist-visibility-dropdown-option");
    const sortOptions = document.querySelectorAll(".playlist-sort-dropdown-option");

    visibilityOptions.forEach(option => {
      option.addEventListener("click", (event) => {
        const selectedValue = event.target.textContent;
        visibilityValue.firstChild.textContent = selectedValue;
        document.getElementById('playlistVisibilityOptions').classList.add('hidden');
        checkFormChanges();
      });
    });

    sortOptions.forEach(option => {
      option.addEventListener("click", (event) => {
        const selectedValue = event.target.textContent;
        sortValue.firstChild.textContent = selectedValue;
        document.getElementById('sortOptions').classList.add('hidden');
        checkFormChanges();
      });
    });

    deleteButton.addEventListener('mouseover', () => {
      // deleteButton.style.backgroundColor = '#282828';
      // deleteButton.style.color = 'white';
    });

    deleteButton.addEventListener('mouseout', () => {
      // deleteButton.style.backgroundColor = '#000';
      // deleteButton.style.color = '#fff';
    });
  }
});


// Sidebar'ı açıp kapatmak için toggle fonksiyonu
function toggleYourVideosSidebar() {
  const sidebar = document.querySelector('.yourVideos-sidebar');
  const sidebardata = document.querySelectorAll('item-name');

  sidebar.classList.toggle('show'); // Sidebar'ı göster ya da gizle
  if (sidebar.classList.contains('show')) {
    sidebardata.forEach(link => {
      link.style.display = 'none';
    });

  }
  else {
    sidebardata.forEach(link => {
      link.style.display = 'block';
    });
  }

}

function toggleReplies(id) {
  const section = document.getElementById(id);
  if (section.style.display === 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('videoAddToPlaylistModalOverlay').style.display = 'none';

  let rowsPerPage = 10; // Varsayılan olarak 3 satır gösterilecek
  let currentPage = 1;

  const tableRows = document.querySelectorAll(".table tbody .table-row");
  const pageNumber = document.getElementById("pageNumber");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const firstButton = document.getElementById("firstPage");
  const lastButton = document.getElementById("lastPage");

  function showPage(page) {
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    tableRows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "table-row" : "none";
    });

    pageNumber.textContent = page;
    prevButton.disabled = page === 1;
    firstButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;
    lastButton.disabled = page === totalPages;
  }

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  nextButton.addEventListener("click", function () {
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  firstButton.addEventListener("click", function () {
    currentPage = 1;
    showPage(currentPage);
  });

  lastButton.addEventListener("click", function () {
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);
    currentPage = totalPages;
    showPage(currentPage);
  });

  showPage(currentPage);

  // Sayfa başına satır sayısını değiştirme fonksiyonu
  function ChangePageNumber(event) {
    event.stopPropagation(); // Menü kapanmasını engelle
    const dropdownMenu = document.getElementById('editPageNumber');

    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  }

  function SelectPageNumber(event) {
    const selectedValue = parseInt(event.target.textContent); // Seçilen değeri sayıya çevir
    rowsPerPage = selectedValue; // rowsPerPage değerini güncelle
    document.querySelector(".current-page-number").textContent = selectedValue; // Arayüzü güncelle
    document.getElementById('editPageNumber').style.display = "none"; // Dropdown'ı kapat

    currentPage = 1; // Yeni değere göre sayfayı sıfırla
    showPage(currentPage); // Sayfayı tekrar göster
  }

  // Menü öğelerine tıklama olaylarını ekle
  document.querySelectorAll("#editPageNumber li").forEach(item => {
    item.addEventListener("click", SelectPageNumber);
  });

  // Menü dışında bir yere tıklanırsa menüyü kapat
  window.addEventListener("click", function (event) {
    if (!event.target.closest('.pagination-number')) {
      document.getElementById('editPageNumber').style.display = "none";
    }
  });

  document.querySelector(".change-page-number").addEventListener("click", ChangePageNumber);

  /* tablo filtereleme */
  const table = document.querySelector(".table tbody");
  const rows = Array.from(table.querySelectorAll(".table-row"));

  function sortTable(columnIndex, dataType, isAscending) {
    const sortedRows = rows.sort((a, b) => {
      let aValue = a.children[columnIndex].textContent.trim();
      let bValue = b.children[columnIndex].textContent.trim();

      // Tarih formatına göre dönüştür
      if (dataType === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      // Sayısal veri olarak işle
      else if (dataType === "number") {
        aValue = parseInt(aValue.replace(/\D/g, ""), 10) || 0;
        bValue = parseInt(bValue.replace(/\D/g, ""), 10) || 0;
      }

      return isAscending ? aValue - bValue : bValue - aValue;
    });

    // Tabloyu güncelle
    table.innerHTML = "";
    sortedRows.forEach(row => table.appendChild(row));
  }

  let dateAscending = true;
  let viewsAscending = true;
  let commentsAscending = true;

  document.getElementById("sortDate").addEventListener("click", function () {
    sortTable(3, "date", dateAscending);
    dateAscending = !dateAscending;
  });

  document.getElementById("sortViews").addEventListener("click", function () {
    sortTable(4, "number", viewsAscending);
    viewsAscending = !viewsAscending;
  });

  document.getElementById("sortComments").addEventListener("click", function () {
    sortTable(5, "number", commentsAscending);
    commentsAscending = !commentsAscending;
  });


});

document.addEventListener("DOMContentLoaded", function () {
  const inputFieldTitle = document.getElementById("video-title");
  const inputFieldDescription = document.getElementById("video-description");

  if (inputFieldTitle) {
    const maxLength = 100;
    const wordCounter = document.querySelector(".title-word-counter");
    inputFieldTitle.addEventListener("input", function () {
      let length = inputFieldTitle.value.length;
      wordCounter.textContent = `${length}/${maxLength}`;
    });
  }
  if (inputFieldDescription) {
    const maxLength = 5000;
    const wordCounter = document.querySelector(".description-word-counter");
    inputFieldDescription.addEventListener("input", function () {
      let length = inputFieldDescription.value.length;
      wordCounter.textContent = `${length}/${maxLength}`;
    });
  }

  /* input kenarlık renk ayarı */
  const inputs = document.querySelectorAll('.video-title-container input, .video-description-container textarea, .post-title-container input, .name-input-container input, .username-input-container input, .playlist-title-container input, .link-input-container input, .email-input-container input, .playlist-description-container textarea, .channel-description-container textarea');
  const divs = document.querySelectorAll('.video-title-container, .video-description-container, .post-title-container, .playlist-title-container, .name-input-container, .username-input-container, .playlist-description-container, .email-input-container, .link-input-container, .channel-description-container');

  inputs.forEach((input, index) => {
    input.addEventListener('focus', function () {
      divs[index].classList.add('focused');
    });

    input.addEventListener('blur', function () {
      divs[index].classList.remove('focused');
    });
  });


  const textarea = document.getElementById("video-description");
  const textarea2 = document.getElementById("playlist-description");
  const textarea3 = document.getElementById("channel-description");
  const wordCounter = document.querySelector(".description-word-counter");
  const maxLength = 5000; // Maksimum karakter limiti

  function autoResize() {
    this.style.height = "auto";  // Önce yükseklik sıfırlanır
    this.style.height = (this.scrollHeight) + "px";  // Scroll yüksekliği kadar genişletilir
  }

  function updateWordCount() {
    let length = textarea.value.length;
    wordCounter.textContent = `${length}/${maxLength}`;
  }

  function autoResize2() {
    this.style.height = "auto";  // Önce yükseklik sıfırlanır
    this.style.height = (this.scrollHeight) + "px";  // Scroll yüksekliği kadar genişletilir
  }

  function updateWordCount2() {
    let length = textarea2.value.length;
    wordCounter.textContent = `${length}/${maxLength}`;
  }

  function autoResize3() {
    this.style.height = "auto";  // Önce yükseklik sıfırlanır
    this.style.height = (this.scrollHeight) + "px";  // Scroll yüksekliği kadar genişletilir
  }

  function updateWordCount3() {
    let length = textarea3.value.length;
    wordCounter.textContent = `${length}/${maxLength}`;
  }

  if (textarea) {
    textarea.addEventListener("input", autoResize);
    textarea.addEventListener("input", updateWordCount);
  }
  if (textarea2) {
    textarea2.addEventListener("input", autoResize2);
    textarea2.addEventListener("input", updateWordCount2);
  }
  if (textarea3) {
    textarea3.addEventListener("input", autoResize3);
    textarea3.addEventListener("input", updateWordCount3);
  }

  const dropdownButton = document.getElementById('playlistDropdown');
  const dropdownButton2 = document.getElementById('visibilityDropdown');
  const dropdownOptions = document.getElementById('playlistOptions');
  const dropdownOptions2 = document.querySelector('.preview-video-features .dropdown-options');
  const finishButton = document.getElementById('finishSelection');
  const finishButton2 = document.getElementById('finishSelection2');

  dropdownButton.addEventListener('click', (event) => {
    event.preventDefault(); // Sayfanın yenilenmesini engeller
    dropdownOptions.classList.toggle('hidden');
  });

  document.addEventListener('click', (event) => {
    // Eğer tıklanan öğe dropdownButton veya dropdownOptions değilse, dropdown'ı gizle
    if (!dropdownButton.contains(event.target) && !dropdownOptions.contains(event.target)) {
      dropdownOptions.classList.add('hidden');
    }

    if (!dropdownButton2.contains(event.target) && !dropdownOptions2.contains(event.target)) {
      dropdownOptions2.classList.add('hidden');
    }
  });

  finishButton.addEventListener('click', (event) => {
    event.preventDefault(); // Sayfanın yenilenmesini engeller
    const selectedPlaylists = Array.from(
      dropdownOptions.querySelectorAll('input:checked')
    ).map(option => option.value);

    dropdownButton.innerHTML = selectedPlaylists.length
      ? selectedPlaylists.join(', ') + `<span class="material-symbols-outlined">
                                        keyboard_arrow_down
                                    </span>`
      : `Oynatma listesi seçin <span class="material-symbols-outlined">
                                        keyboard_arrow_down
                                    </span>`;

    dropdownOptions.classList.add('hidden');
  });

  const visibilityValue = dropdownButton2?.querySelector('.features-visibility-value');

  console.log('Dropdown Button:', dropdownButton2); // Hata ayıklama
  console.log('Dropdown Options:', dropdownOptions2); // Hata ayıklama
  console.log('Visibility Value:', visibilityValue); // Hata ayıklama

  if (dropdownButton2 && dropdownOptions2) {
    // Dropdown butonuna tıklandığında menüyü aç/kapat
    dropdownButton2.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('Dropdown button clicked'); // Hata ayıklama
      dropdownOptions2.classList.toggle('hidden');
    });

    // Radio butonlarına tıklandığında
    const radioButtons = dropdownOptions2.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
      radio.addEventListener('change', (event) => {
        const selectedOption = event.target.closest('label');
        console.log('Selected Option:', selectedOption); // Hata ayıklama

        if (selectedOption) {
          const selectedValue = selectedOption.textContent.trim();
          console.log('Selected Value:', selectedValue); // Hata ayıklama

          // Seçilen değeri göster
          if (visibilityValue) {
            let icon = 'public';
            if (selectedValue === 'Private') {
              icon = 'lock';
            } else if (selectedValue === 'Unlisted') {
              icon = 'link';
            }

            visibilityValue.innerHTML = `
              <div class="features-visibility-icon">
                <span class="material-symbols-outlined">${icon}</span>${selectedValue}
              </div>
              <span class="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            `;
          }
        }
      });
    });

    // Bitti butonuna tıklanırsa dropdown'u kapat ve butonları aktif et
    if (finishButton2) {
      finishButton2.addEventListener('click', (event) => {
        event.preventDefault(); // Form göndermeyi engelle
        event.stopPropagation(); // Event'in yayılmasını engelle
        dropdownOptions2.classList.add('hidden');

        // Butonları aktif et
        if (saveButton && deleteButton) {
          saveButton.disabled = false;
          deleteButton.disabled = false;
          saveButton.style.pointerEvents = 'all';
          saveButton.style.color = '#000';
          deleteButton.style.pointerEvents = 'all';
          deleteButton.style.color = '#fff';
          deleteButton.style.background = '#000';
        }
      });
    }

    // Menü dışında bir yere tıklanırsa dropdown'u kapat
    document.addEventListener('click', (event) => {
      if (!dropdownButton2.contains(event.target) && !dropdownOptions2.contains(event.target)) {
        dropdownOptions2.classList.add('hidden');
      }
    });
  }

  // Add video edit page handling
  const videoEditPage = document.querySelector('.video-edit-page');
  if (videoEditPage) {
    const saveButton = document.querySelector('.page-navbar-actions .yourVideos-btn:nth-of-type(1)');
    const deleteButton = document.querySelector('.page-navbar-actions .yourVideos-btn:nth-of-type(2)');

    const actions = document.querySelectorAll('.video-edit-page input, .video-edit-page select, .video-edit-page textarea');

    let initialValues;

    function checkFormChanges() {
      console.log('Video Edit: checkFormChanges called.');
      let hasChanges = false;
      if (!initialValues) {
        console.log('Video Edit: initialValues not yet captured. Exiting checkFormChanges.');
        return;
      }
      actions.forEach((input, index) => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          if (input.checked !== initialValues[index]) {
            hasChanges = true;
            console.log(`Video Edit: Change detected in checkbox/radio: ${input.name}, New: ${input.checked}, Old: ${initialValues[index]}`);
          }
        } else {
          if (input.value !== initialValues[index]) {
            hasChanges = true;
            console.log(`Video Edit: Change detected in input/textarea/select: ${input.id || input.name}, New: ${input.value}, Old: ${initialValues[index]}`);
          }
        }
      });

      console.log('Video Edit: Final hasChanges value:', hasChanges);

      if (saveButton) {
        console.log('Video Edit: saveButton exists.');
        saveButton.disabled = !hasChanges;
        console.log('Video Edit: saveButton disabled state set to:', saveButton.disabled);
      }

      if (deleteButton) {
        console.log('Video Edit: deleteButton exists.');
        deleteButton.disabled = !hasChanges;
        if (!deleteButton.disabled) {
          deleteButton.style.backgroundColor = '#000';
          deleteButton.style.color = '#fff';
          deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.backgroundColor = '#282828';
          });
          deleteButton.addEventListener('mouseout', () => {
            deleteButton.style.backgroundColor = '#000';
          });
        } else {
          deleteButton.style.backgroundColor = '#f4f3f3';
          deleteButton.style.color = '#999';
        }
        console.log('Video Edit: deleteButton disabled state set to:', deleteButton.disabled);
      }
    }

    setTimeout(() => {
      initialValues = Array.from(actions).map(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          return input.checked;
        } else {
          return input.value;
        }
      });
      console.log('Video Edit: Initial values captured:', initialValues);

      if (saveButton) {
        saveButton.disabled = true;
        console.log('Video Edit: Initial saveButton disabled:', saveButton.disabled);
      }
      if (deleteButton) {
        deleteButton.disabled = true;
        console.log('Video Edit: Initial deleteButton disabled:', deleteButton.disabled);
      }
      checkFormChanges();
    }, 50);

    actions.forEach(input => {
      input.addEventListener('input', checkFormChanges);
      input.addEventListener('change', checkFormChanges);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const replyContainers = document.querySelectorAll(".comment-reply-container");
  const replyActions = document.querySelectorAll(".comment-reply-actions");

  // Tüm elemanları başlangıçta gizle
  replyContainers.forEach(container => {
    container.style.display = "none";
  });

  replyActions.forEach(actions => {
    actions.style.display = "none";
  });

  // "Yanıtla" butonları için olay dinleme
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("reply-btn")) {
      event.preventDefault();

      const commentActions = event.target.closest(".comment-list-actions");
      const replyContainer = commentActions.querySelector(".comment-reply-container");
      const replyActions = commentActions.querySelector(".comment-reply-actions");

      const isHidden = replyContainer.style.display === "none";

      replyContainer.style.display = isHidden ? "flex" : "none";
      replyActions.style.display = isHidden ? "flex" : "none";
    }
  });

  // "İptal" butonları için olay dinleme
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("cancel-btn")) {
      event.preventDefault();

      const actionsContainer = event.target.closest(".comment-reply-actions-container");
      const commentActions = actionsContainer.closest(".comment-list-actions");

      const replyContainer = commentActions.querySelector(".comment-reply-container");
      const replyActions = commentActions.querySelector(".comment-reply-actions");

      replyContainer.style.display = "none";
      replyActions.style.display = "none";
    }

    // Yanıt dropdown butonları için olay dinleyici
    if (event.target.id === "commentReplyDropdown" || event.target.closest("#commentReplyDropdown")) {
      event.preventDefault();

      const dropdown = event.target.closest(".comment-list-actions").querySelector(".dropdown-comment-reply");

      // Açık/Kapalı durumu kontrol et ve değiştir
      if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
      } else {
        dropdown.classList.add("hidden");
      }
    }
  });

  // Form gönderimlerini ayrı ayrı ele alma
  document.body.addEventListener("submit", function (event) {
    if (event.target.classList.contains("comment-form")) {
      event.preventDefault();

      const form = event.target;
      const replyText = form.querySelector(".reply-comment-description").value;

      console.log("Gönderilen Yanıt:", replyText);

      // Form gönderimi sonrası kapatma
      const replyContainer = form.querySelector(".comment-reply-container");
      const replyActions = form.querySelector(".comment-reply-actions");

      replyContainer.style.display = "none";
      replyActions.style.display = "none";

      form.reset(); // Gönderim sonrası formu temizle
    }
  });

  // Her textarea için bağımsız olaylar
  document.querySelectorAll(".reply-comment-description").forEach(textarea => {
    const div = textarea.closest(".video-reply-div");

    textarea.addEventListener("focus", function () {
      div.classList.add("focused");
    });

    textarea.addEventListener("blur", function () {
      div.classList.remove("focused");
    });

    textarea.addEventListener("input", function () {
      this.style.height = "auto"; // Önce sıfırlanır
      this.style.height = (this.scrollHeight) + "px"; // Dinamik genişletilir
    });
  });
  document.getElementById('commentFilterDropdown1').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('commentFilterDropdownMenu1');
    dropdownMenu.classList.toggle('show');
  });

  document.getElementById('applyButton1').addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="commentFilterStatus"]:checked');
    const commentFilterDropdown = document.getElementById('commentFilterDropdown1');
    if (selectedOption) {
      commentFilterDropdown.innerHTML = `
      ${selectedOption.nextElementSibling.nextElementSibling.textContent}
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                    </span>
                          
      `
      const dropdownMenu = document.getElementById('commentFilterDropdownMenu1');
      dropdownMenu.classList.remove('show');
    } else {
      alert('Lütfen bir seçenek seçin.');
    }
  });
  document.getElementById('closeDropdown1').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('commentFilterDropdownMenu1');
    dropdownMenu.classList.remove('show');
  });
  // Menü dışında bir yere tıklanırsa menüyü kapat
  window.addEventListener('click', function (event) {
    if (!event.target.closest('#commentFilterDropdown1') && !event.target.closest('#commentFilterDropdownMenu1')) {
      document.getElementById('commentFilterDropdownMenu1').classList.remove('show');
    }
  });
  document.getElementById('commentFilterDropdown2').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('commentFilterDropdownMenu2');
    dropdownMenu.classList.toggle('show');
  });

  document.getElementById('applyButton2').addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="commentFilterStatus"]:checked');
    const commentFilterDropdown = document.getElementById('commentFilterDropdown2');
    if (selectedOption) {
      commentFilterDropdown.innerHTML = `
      ${selectedOption.nextElementSibling.nextElementSibling.textContent}
                                <span class="material-symbols-outlined">
                                    keyboard_arrow_down
                                    </span>
                          
      `
      const dropdownMenu = document.getElementById('commentFilterDropdownMenu2');
      dropdownMenu.classList.remove('show');
    } else {
      alert('Lütfen bir seçenek seçin.');
    }
  });
  document.getElementById('closeDropdown2').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('commentFilterDropdownMenu2');
    dropdownMenu.classList.remove('show');
  });
  // Menü dışında bir yere tıklanırsa menüyü kapat
  window.addEventListener('click', function (event) {
    if (!event.target.closest('#commentFilterDropdown2') && !event.target.closest('#commentFilterDropdownMenu2')) {
      document.getElementById('commentFilterDropdownMenu2').classList.remove('show');
    }
  });

});



document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById('video-thumbnail-upload');
  const previewImg = document.getElementById('video-thumbnail-preview');

  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImg.src = e.target.result; // Seçilen resmin URL'sini img etiketi içine koy
      };

      reader.readAsDataURL(file); // Dosyayı URL'ye dönüştür
    }
  });
});

// Sayfa yüklendiğinde URL parametresini kontrol et
window.addEventListener('load', function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('openUpload') === 'true') {
    // Popup'ı aç
    document.getElementById('videoUploadOverlay').classList.add('active');
    document.getElementById('videoUploadPopup').classList.add('active');
  }
});

// Popup'ı açma fonksiyonu - DOMContentLoaded dışında, global scope'ta
function openVideoUploadPopup(event) {
  event.preventDefault();
  document.getElementById('videoUploadOverlay').classList.add('active');
  document.getElementById('videoUploadPopup').classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
  // Video yükleme popup'ı için elementler
  const videoUploadOverlay = document.querySelector('.video-upload-overlay');
  const videoUploadPopup = document.querySelector('.video-upload-popup');
  const videoUploadDetails = document.querySelector('.video-upload-details');
  const videoUploadArea = document.querySelector('.video-upload-area');
  const closeButton = document.querySelector('.video-upload-close');
  const cancelButton = document.querySelector('.video-upload-actions .cancel');
  const uploadButton = document.querySelector('.video-upload-actions .upload');
  const fileInput = document.querySelector('#videoFileInput'); // ID'yi düzelttik

  // Popup'ı kapatma fonksiyonu
  function closeVideoUploadPopup() {
    videoUploadOverlay.classList.remove('active');
    videoUploadPopup.classList.remove('active');
    videoUploadDetails.classList.remove('active');
    videoUploadArea.style.display = 'block';

    // Form durumunu sıfırla
    if (fileInput) {
      fileInput.value = '';
    }
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    if (videoTitle) videoTitle.value = '';
    if (videoDescription) videoDescription.value = '';

    // Yaş sınırı radio butonlarını sıfırla
    const ageRestrictionRadios = document.querySelectorAll('input[name="ageRestriction"]');
    ageRestrictionRadios.forEach(radio => {
      radio.checked = false;
    });

    // Yorum ayarları radio butonlarını sıfırla
    const commentSettingsRadios = document.querySelectorAll('input[name="commentSettings"]');
    commentSettingsRadios.forEach(radio => {
      radio.checked = false;
    });

    // Kategori seçimini sıfırla
    const categorySelect = document.getElementById('video-category-dropdown');
    if (categorySelect) {
      categorySelect.selectedIndex = 0;
    }

    // Küçük resim seçimini sıfırla
    const thumbnailInput = document.getElementById('thumbnail-upload');
    if (thumbnailInput) {
      thumbnailInput.value = '';
    }
    // Küçük resim önizlemesini sıfırla
    const thumbnailPreview = document.getElementById('thumbnail-preview');
    if (thumbnailPreview) {
      thumbnailPreview.src = "https://dummyimage.com/200x100/949494/000000";
    }
  }

  // Kapatma butonlarına event listener'lar ekle
  if (closeButton) {
    closeButton.addEventListener('click', closeVideoUploadPopup);
  }
  if (cancelButton) {
    cancelButton.addEventListener('click', closeVideoUploadPopup);
  }


  // Dosya seçildiğinde
  if (fileInput) {
    fileInput.addEventListener('change', function (e) {
      if (e.target.files.length > 0) {
        videoUploadArea.style.display = 'none';
        videoUploadDetails.classList.add('active');
      }
    });
  }

  // Upload butonuna tıklandığında
  if (uploadButton) {
    uploadButton.addEventListener('click', function (e) {
      e.preventDefault();
      const title = document.getElementById('videoTitle').value;
      const description = document.getElementById('videoDescription').value;
      const videoFile = document.getElementById('videoFileInput').files[0];
      const thumbnailFile = document.getElementById('thumbnail-upload').files[0];
      const visibility = document.querySelector('input[name="visibility"]:checked').value;
      const ageRestriction = document.querySelector('input[name="ageRestriction"]:checked').value;
      const commentSettings = document.querySelector('input[name="commentSettings"]:checked').value;
      const category = document.getElementById('video-category-dropdown').value;

      console.log('Video yükleniyor:', {
        title,
        description,
        videoFile,
        thumbnailFile,
        visibility,
        ageRestriction,
        commentSettings,
        category
      });

      closeVideoUploadPopup();
    });
  }

  // Drag and drop işlemleri
  if (videoUploadArea) {
    videoUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      videoUploadArea.classList.add('dragover');
    });

    videoUploadArea.addEventListener('dragleave', () => {
      videoUploadArea.classList.remove('dragover');
    });

    videoUploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      videoUploadArea.classList.remove('dragover');

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('video/')) {
        document.getElementById('videoFileInput').files = e.dataTransfer.files;
        videoUploadArea.style.display = 'none';
        videoUploadDetails.classList.add('active');
      }
    });
  }

  // Karakter sayacı
  const videoTitle = document.getElementById('videoTitle');
  if (videoTitle) {
    videoTitle.addEventListener('input', function () {
      const count = this.value.length;
      this.parentElement.querySelector('.title-word-counter').textContent = `${count}/100`;
    });
  }

  const videoDescription = document.getElementById('videoDescription');
  if (videoDescription) {
    videoDescription.addEventListener('input', function () {
      const count = this.value.length;
      this.parentElement.querySelector('.description-word-counter').textContent = `${count}/5000`;
    });
  }

  // Küçük resim seçildiğinde önizleme göster
  const thumbnailUpload = document.getElementById('thumbnail-upload');
  if (thumbnailUpload) {
    thumbnailUpload.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById('thumbnail-preview').src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  // Tab Switching for Customization Page
  const tabItems = document.querySelectorAll('.customization-tabs .tab-item');
  const tabContents = document.querySelectorAll('.customization-tab-content');

  tabItems.forEach(item => {
    item.addEventListener('click', function () {
      tabItems.forEach(tab => tab.classList.remove('active'));
      this.classList.add('active');

      const targetTab = this.dataset.tab + '-tab-content';
      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Copy Channel URL
  const copyIcon = document.querySelector('.url-display-container .copy-icon');
  if (copyIcon) {
    copyIcon.addEventListener('click', function () {
      const channelUrlInput = this.previousElementSibling;
      channelUrlInput.select();
      channelUrlInput.setSelectionRange(0, 99999); // For mobile devices
      document.execCommand('copy');
      alert('Kanal URLsi kopyalandı!');
    });
  }

  // Add New Link
  const addLinkBtn = document.querySelector('.add-link-btn');
  const linksContainer = document.querySelector('.links-container');

  if (addLinkBtn) {
    addLinkBtn.addEventListener('click', function () {
      const newLinkItem = document.createElement('div');
      const linkContainer = document.createElement('div');
      const lintInputContainer = document.querySelectorAll(".link-input-container");
      linkContainer.classList.add('link-input-container');
      linkContainer.appendChild(newLinkItem);
      newLinkItem.classList.add('link-item');
      newLinkItem.innerHTML =
        '<div class="link-input-container">'+
        '<input type="text" class="customization-input username-input link-title" placeholder="Link Title (required)">' +
        '</div>'+
        '<div class="link-input-container">'+
        '<input type="text" class="customization-input username-input link-url" placeholder="URL (required)">' +
        '</div>'+
        '<span class="material-symbols-outlined remove-link-btn">remove_circle</span>' +
        '<span class="url-validation-message" style="color: red; font-size: 12px; display: block; margin-top: -10px; margin-bottom: 5px;"></span>';
        linksContainer.appendChild(newLinkItem);

      const newLinkTitleInput = newLinkItem.querySelector('.link-title');
      const newLinkUrlInput = newLinkItem.querySelector('.link-url');
      const validationMessageSpan = newLinkItem.querySelector('.url-validation-message');

      // URL validation function
      function validateUrl(url) {
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlRegex.test(url);
      }

      // Function to check all link inputs
      function checkLinkInputs() {
        const allLinkItems = document.querySelectorAll('.link-item');
        let allValid = true;

        allLinkItems.forEach(item => {
          const titleInput = item.querySelector('.link-title');
          const urlInput = item.querySelector('.link-url');
          
          if (!titleInput.value.trim() || !urlInput.value.trim() || !validateUrl(urlInput.value.trim())) {
            allValid = false;
          }
        });
      }

      // Add event listeners for both inputs
      [newLinkTitleInput, newLinkUrlInput].forEach(input => {
        input.addEventListener('input', function() {
          if (input === newLinkUrlInput) {
            const url = this.value.trim();
            if (url && !validateUrl(url)) {
              validationMessageSpan.textContent = 'Lütfen geçerli bir URL girin (örn: https://www.example.com).';
              this.classList.add('invalid-input');
            } else {
              validationMessageSpan.textContent = '';
              this.classList.remove('invalid-input');
            }
          }
          checkLinkInputs();
          
        });

        input.addEventListener('blur', function() {
          if (input === newLinkUrlInput) {
            const url = this.value.trim();
            if (url && !validateUrl(url)) {
              validationMessageSpan.textContent = 'Lütfen geçerli bir URL girin (örn: https://www.example.com).';
              this.classList.add('invalid-input');
            } else {
              validationMessageSpan.textContent = '';
              this.classList.remove('invalid-input');
            }
          }
          checkLinkInputs();
        });
      });

      // Add event listener to the remove button
      newLinkItem.querySelector('.remove-link-btn').addEventListener('click', function () {
        newLinkItem.remove();
        checkLinkInputs(); // Check remaining links after removal
      });
    });
  }

  // Initial event listener for existing remove buttons (if any, though none exist initially)
  document.querySelectorAll('.remove-link-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.link-item').remove();
    });
  });

  // Banner Upload Functionality
  const bannerUploadButton = document.getElementById('bannerUploadButton');
  const bannerFileInput = document.getElementById('bannerFileInput');
  const bannerPreview = document.querySelector('.banner-preview');

  if (bannerUploadButton && bannerFileInput && bannerPreview) {
    bannerUploadButton.addEventListener('click', () => {
      bannerFileInput.click();
    });

    bannerFileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          bannerPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Profile Picture Upload Functionality
  const profilePicUploadButton = document.getElementById('profilePicUploadButton');
  const profilePicFileInput = document.getElementById('profilePicFileInput');
  const profilePicPreview = document.querySelector('.profile-picture-preview');

  if (profilePicUploadButton && profilePicFileInput && profilePicPreview) {
    profilePicUploadButton.addEventListener('click', () => {
      profilePicFileInput.click();
    });

    profilePicFileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profilePicPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Add Section Dropdown functionality
  const addSectionButton = document.getElementById('addSectionButton');
  const addSectionDropdown = document.getElementById('addSectionDropdown');

  if (addSectionButton && addSectionDropdown) {
    addSectionButton.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent immediate closing from window click
      addSectionDropdown.style.display = addSectionDropdown.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function (event) {
      if (!addSectionDropdown.contains(event.target) && event.target !== addSectionButton) {
        addSectionDropdown.style.display = 'none';
      }
    });
  }
  window.addEventListener('click', function (event) {
    if (!addSectionDropdown.contains(event.target) && event.target !== addSectionButton) {
      addSectionDropdown.style.display = 'none';
    }
  });

  // Handle clicks on dropdown items
  addSectionDropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', function () {
      const sectionName = this.textContent.trim();
      console.log(`Bölüm eklendi: ${sectionName}`);
      // Here you would add logic to actually add the section to the page
      // For now, we just log it and close the dropdown
      addSectionDropdown.style.display = 'none';
    });
  });

  // Kanal fragmanı modalı açma/kapama
  const channelTrailerOption = document.getElementById('channelTrailerOption');
  const videoSelectionModalOverlay = document.getElementById('videoSelectionModalOverlay');
  const closeVideoModalBtn = document.querySelector('.video-selection-modal .close-modal-btn');
  const playlistSelectionModalOverlay = document.getElementById('playlistSelectionModalOverlay');
  const closePlaylistModalBtn = document.querySelector('.playlist-selection-modal .close-playlist-modal-btn');

  let activeVideoSection = null; // To track which section triggered the modal
  let activePlaylistSection = null; // To track which playlist section triggered the modal

  if (channelTrailerOption) {
    channelTrailerOption.addEventListener('click', function () {
      videoSelectionModalOverlay.style.display = 'flex';
      activeVideoSection = 'channelTrailer';
      addSectionDropdown.style.display = 'none'; // Close add section dropdown
    });
  }

  const featuredContentOption = document.getElementById('featuredContentOption');
  if (featuredContentOption) {
    featuredContentOption.addEventListener('click', function () {
      videoSelectionModalOverlay.style.display = 'flex';
      activeVideoSection = 'featuredVideo';
      addSectionDropdown.style.display = 'none'; // Close add section dropdown
    });
  }

  const singlePlaylistOption = document.getElementById('singlePlaylistOption');
  if (singlePlaylistOption) {
    singlePlaylistOption.addEventListener('click', function () {
      playlistSelectionModalOverlay.style.display = 'flex';
      activePlaylistSection = 'singlePlaylist';
      addSectionDropdown.style.display = 'none'; // Close add section dropdown
    });
  }

  if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', function () {
      videoSelectionModalOverlay.style.display = 'none';
      activeVideoSection = null;
    });
  }

  if (closePlaylistModalBtn) {
    closePlaylistModalBtn.addEventListener('click', function () {
      playlistSelectionModalOverlay.style.display = 'none';
      activePlaylistSection = null;
    });
  }

  if (videoSelectionModalOverlay) {
    videoSelectionModalOverlay.addEventListener('click', function (event) {
      if (event.target === videoSelectionModalOverlay) {
        videoSelectionModalOverlay.style.display = 'none';
        activeVideoSection = null;
      }
    });
  }

  if (playlistSelectionModalOverlay) {
    playlistSelectionModalOverlay.addEventListener('click', function (event) {
      if (event.target === playlistSelectionModalOverlay) {
        playlistSelectionModalOverlay.style.display = 'none';
        activePlaylistSection = null;
      }
    });
  }

  // Video seçimi ve Kanal fragmanı bölümünü güncelleme
  const videoItems = document.querySelectorAll('.modal-video-item');
  const channelTrailerSection = document.getElementById('channelTrailerSection');
  const channelTrailerThumbnail = channelTrailerSection.querySelector('.channel-trailer-thumbnail');
  const channelTrailerVideoTitle = channelTrailerSection.querySelector('.video-title');
  const channelTrailerVideoUploadInfo = channelTrailerSection.querySelector('.video-upload-info');

  const featuredVideoSection = document.getElementById('featuredVideoSection');
  const featuredVideoThumbnail = featuredVideoSection.querySelector('.featured-video-thumbnail');
  const featuredVideoTitle = featuredVideoSection.querySelector('.video-title');
  const featuredVideoUploadInfo = featuredVideoSection.querySelector('.video-upload-info');

  videoItems.forEach(item => {
    item.addEventListener('click', function () {
      const thumbnailSrc = this.dataset.thumbnail;
      const title = this.dataset.title;
      const uploadInfo = this.dataset.uploadInfo;

      if (activeVideoSection === 'channelTrailer') {
        if (channelTrailerSection) {
          channelTrailerThumbnail.src = thumbnailSrc;
          channelTrailerVideoTitle.textContent = title;
          channelTrailerVideoUploadInfo.textContent = uploadInfo;
          channelTrailerSection.style.display = 'flex';
        }
      } else if (activeVideoSection === 'featuredVideo') {
        if (featuredVideoSection) {
          featuredVideoThumbnail.src = thumbnailSrc;
          featuredVideoTitle.textContent = title;
          featuredVideoUploadInfo.textContent = uploadInfo;
          featuredVideoSection.style.display = 'flex';
        }
      }
      videoSelectionModalOverlay.style.display = 'none';
      activeVideoSection = null;
    });
  });

  // Playlist seçimi ve Tek oynatma listesi bölümünü güncelleme
  const playlistItems = document.querySelectorAll('.modal-playlist-item');
  const singlePlaylistSection = document.getElementById('singlePlaylistSection');
  const singlePlaylistThumbnailMain = singlePlaylistSection ? singlePlaylistSection.querySelector('.playlist-thumbnail-main-display') : null;
  const singlePlaylistTitle = singlePlaylistSection ? singlePlaylistSection.querySelector('.playlist-title-display') : null;
  const singlePlaylistVideoCount = singlePlaylistSection ? singlePlaylistSection.querySelector('.playlist-video-count-display') : null;

  playlistItems.forEach(item => {
    item.addEventListener('click', function () {
      const thumbnailMainSrc = this.dataset.thumbnail1;
      const title = this.dataset.title;
      const videoCount = this.dataset.videoCount;

      if (activePlaylistSection === 'singlePlaylist') {
        if (singlePlaylistSection && singlePlaylistThumbnailMain && singlePlaylistTitle && singlePlaylistVideoCount) {
          singlePlaylistThumbnailMain.src = thumbnailMainSrc;
          singlePlaylistTitle.textContent = title;
          singlePlaylistVideoCount.textContent = videoCount;
          singlePlaylistSection.style.display = 'flex';
        }

      }
      playlistSelectionModalOverlay.style.display = 'none';
      activePlaylistSection = null;
    });
  });

  // Kanal fragmanı seçenekleri dropdown'ı
  const channelTrailerMoreOptions = document.getElementById('channelTrailerMoreOptions');
  const channelTrailerOptionsDropdown = document.getElementById('channelTrailerOptionsDropdown');
  const changeVideoOption = document.getElementById('changeVideoOption');
  const removeVideoOption = document.getElementById('removeVideoOption');

  if (channelTrailerMoreOptions) {
    channelTrailerMoreOptions.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent document click from closing it immediately
      channelTrailerOptionsDropdown.classList.toggle('show');
    });
  }

  if (changeVideoOption) {
    changeVideoOption.addEventListener('click', function () {
      videoSelectionModalOverlay.style.display = 'flex';
      activeVideoSection = 'channelTrailer'; // Set active section for changing
      channelTrailerOptionsDropdown.classList.remove('show'); // Hide dropdown after action
    });
  }

  if (removeVideoOption) {
    removeVideoOption.addEventListener('click', function () {
      if (channelTrailerSection) {
        channelTrailerSection.style.display = 'none'; // Hide the section
        channelTrailerThumbnail.src = ''; // Clear thumbnail
        channelTrailerVideoTitle.textContent = ''; // Clear title
        channelTrailerVideoUploadInfo.textContent = ''; // Clear upload info
      }
      channelTrailerOptionsDropdown.classList.remove('show'); // Hide dropdown after action
    });
  }

  // Öne çıkan video seçenekleri dropdown'ı
  const featuredVideoMoreOptions = document.getElementById('featuredVideoMoreOptions');
  const featuredVideoOptionsDropdown = document.getElementById('featuredVideoOptionsDropdown');
  const changeFeaturedVideoOption = document.getElementById('changeFeaturedVideoOption');
  const removeFeaturedVideoOption = document.getElementById('removeFeaturedVideoOption');

  if (featuredVideoMoreOptions) {
    featuredVideoMoreOptions.addEventListener('click', function (event) {
      event.stopPropagation();
      featuredVideoOptionsDropdown.classList.toggle('show');
    });
  }

  if (changeFeaturedVideoOption) {
    changeFeaturedVideoOption.addEventListener('click', function () {
      videoSelectionModalOverlay.style.display = 'flex';
      activeVideoSection = 'featuredVideo'; // Set active section for changing
      featuredVideoOptionsDropdown.classList.remove('show');
    });
  }

  if (removeFeaturedVideoOption) {
    removeFeaturedVideoOption.addEventListener('click', function () {
      if (featuredVideoSection) {
        featuredVideoSection.style.display = 'none';
        featuredVideoThumbnail.src = '';
        featuredVideoTitle.textContent = '';
        featuredVideoUploadInfo.textContent = '';
      }
      featuredVideoOptionsDropdown.classList.remove('show');
    });
  }

  // Tek oynatma listesi seçenekleri dropdown'ı
  const singlePlaylistMoreOptions = document.getElementById('singlePlaylistMoreOptions');
  const singlePlaylistOptionsDropdown = document.getElementById('singlePlaylistOptionsDropdown');
  const changeSinglePlaylistOption = document.getElementById('changeSinglePlaylistOption');
  const removeSinglePlaylistOption = document.getElementById('removeSinglePlaylistOption');

  if (singlePlaylistMoreOptions) {
    singlePlaylistMoreOptions.addEventListener('click', function (event) {
      event.stopPropagation();
      singlePlaylistOptionsDropdown.classList.toggle('show');
    });
  }

  if (changeSinglePlaylistOption) {
    changeSinglePlaylistOption.addEventListener('click', function () {
      playlistSelectionModalOverlay.style.display = 'flex';
      activePlaylistSection = 'singlePlaylist'; // Set active section for changing
      singlePlaylistOptionsDropdown.classList.remove('show');
    });
  }

  if (removeSinglePlaylistOption) {
    removeSinglePlaylistOption.addEventListener('click', function () {
      if (singlePlaylistSection) {
        singlePlaylistSection.style.display = 'none';
        singlePlaylistThumbnailMain.src = '';
        singlePlaylistTitle.textContent = '';
        singlePlaylistVideoCount.textContent = '';
      }
      singlePlaylistOptionsDropdown.classList.remove('show');
    });
  }

  // Dropdown dışında bir yere tıklanırsa gizle (tüm dropdown'lar için)
  document.addEventListener('click', function (event) {
    if (channelTrailerMoreOptions && channelTrailerOptionsDropdown) {
      if (!channelTrailerMoreOptions.contains(event.target) && !channelTrailerOptionsDropdown.contains(event.target)) {
        channelTrailerOptionsDropdown.classList.remove('show');
      }
    }
    if (featuredVideoMoreOptions && featuredVideoOptionsDropdown) {
      if (!featuredVideoMoreOptions.contains(event.target) && !featuredVideoOptionsDropdown.contains(event.target)) {
        featuredVideoOptionsDropdown.classList.remove('show');
      }
    }
    if (singlePlaylistMoreOptions && singlePlaylistOptionsDropdown) {
      if (!singlePlaylistMoreOptions.contains(event.target) && !singlePlaylistOptionsDropdown.contains(event.target)) {
        singlePlaylistOptionsDropdown.classList.remove('show');
      }
    }
  });
});

// Ana Sayfa sekmesi bölüm kaldırma işlevselliği
document.querySelectorAll('.more-options-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.stopPropagation(); // Dropdown'ın kapanmasını engelle
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('section-options-dropdown') || dropdown.classList.contains('channel-trailer-options-dropdown') || dropdown.classList.contains('featured-video-options-dropdown') || dropdown.classList.contains('single-playlist-options-dropdown')) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Dropdown dışına tıklanınca kapat
document.addEventListener('click', function(e) {
    document.querySelectorAll('.section-options-dropdown, .channel-trailer-options-dropdown, .featured-video-options-dropdown, .single-playlist-options-dropdown').forEach(dropdown => {
        if (!dropdown.contains(e.target) && !e.target.classList.contains('more-options-icon')) {
            dropdown.style.display = 'none';
        }
    });
});


// New Playlist Popup
function openNewPlaylistPopup(event) {
  event.preventDefault();
  document.getElementById('newPlaylistOverlay').style.display = 'flex';
}

function closeNewPlaylistPopup() {
  document.getElementById('newPlaylistOverlay').style.display = 'none';
  // Clear input fields and reset dropdowns
  document.getElementById('playlistTitle').value = '';
  document.getElementById('playlistDescription').value = '';
  document.getElementById('playlistVisibility').value = 'public'; // Set to default value
  document.getElementById('playlistSortOrder').value = 'newest'; // Set to default value
  document.querySelector('.playlist-title-word-counter').textContent = '0/100';
  document.querySelector('.playlist-description-word-counter').textContent = '0/5000';
  closeVideoAddToPlaylistModal(); // Close and reset the video add to playlist modal
  updatePlaylistVideosDisplay(); 
}

function createNewPlaylist() {
  // Burada normalde backend post işlemi yapılır
  closeNewPlaylistPopup(); // Formu temizlemek ve popup'ı kapatmak için
  // updatePlaylistVideosDisplay() is already called within closeNewPlaylistPopup, no need to call it again here
}

// Video Add to Playlist Modal Functions
function openVideoAddToPlaylistModal() {
    document.getElementById('videoAddToPlaylistModalOverlay').style.display = 'flex';
    initializeVideoSelection();
}

function closeVideoAddToPlaylistModal() {
    document.getElementById('videoAddToPlaylistModalOverlay').style.display = 'none';
    // Clear selected videos and uncheck all checkboxes when modal closes
    document.querySelector('.selected-videos-list').innerHTML = '';
    document.querySelectorAll('.modal-left-panel .video-select-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    console.log('Selected videos list cleared in closeVideoAddToPlaylistModal.'); // Debugging line
}

// Add event listener for the add video button to open the modal
document.addEventListener('DOMContentLoaded', function() {
    const addVideoButton = document.getElementById('addVideoButton');
    if (addVideoButton) {
        addVideoButton.addEventListener('click', openVideoAddToPlaylistModal);
    }
});

function initializeVideoSelection() {
    const leftPanelVideoItems = document.querySelectorAll('.modal-left-panel .modal-video-item');
    const rightPanelSelectedVideosList = document.querySelector('.selected-videos-list');

    leftPanelVideoItems.forEach(item => {
        const checkbox = item.querySelector('.video-select-checkbox');
        const videoId = item.getAttribute('data-id');
        const videoTitle = item.getAttribute('data-title');

        // Remove any existing event listeners to prevent duplicates
        const clonedCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(clonedCheckbox, checkbox);

        clonedCheckbox.addEventListener('change', function() {
            if (this.checked) {
                addVideoToSelectedList(videoId, videoTitle);
            } else {
                removeVideoFromSelectedList(videoId);
            }
        });
    });
}

function addVideoToSelectedList(id, title) {
    const selectedList = document.querySelector('.selected-videos-list');
    const existingVideo = selectedList.querySelector(`[data-id="${id}"]`);
    
    if (!existingVideo) {
        const videoItem = document.createElement('div');
        videoItem.className = 'modal-video-item';
        videoItem.dataset.id = id;
        videoItem.innerHTML = `
            <p>${title}</p>
        `;
        selectedList.appendChild(videoItem);
        console.log(`Video added to selected list: ${title}, ID: ${id}`); // Debugging line
    }
}

function removeVideoFromSelectedList(id) {
    const selectedVideoItem = document.querySelector(`.selected-videos-list .modal-video-item[data-id="${id}"]`);
    if (selectedVideoItem) {
        selectedVideoItem.remove();
        console.log(`Video removed from selected list: ID: ${id}`); // Debugging line
    }
}

// Function to update the main playlist videos display
function updatePlaylistVideosDisplay() {
    const selectedVideosCount = document.querySelectorAll('.selected-videos-list .modal-video-item').length;
    const playlistVideosDisplay = document.getElementById('playlistVideosDisplay');
    console.log(`updatePlaylistVideosDisplay called. Selected videos count: ${selectedVideosCount}`); // Debugging line
    
    if (playlistVideosDisplay) {
        if (selectedVideosCount > 0) {
            playlistVideosDisplay.innerHTML = `
                <div class="playlist-videos-summary">
                    <span class="material-symbols-outlined">play_circle</span>
                    <span class="video-count-text">${selectedVideosCount} video</span>
                    <button type="button" class="yourVideos-btn edit-playlist-videos-btn">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                </div>
            `;
            // Add event listener to the new edit button
            const editButton = playlistVideosDisplay.querySelector('.edit-playlist-videos-btn');
            if (editButton) {
                editButton.addEventListener('click', openVideoAddToPlaylistModal);
            }
        } else {
            // Revert to original "Video ekle" button if no videos are selected
            playlistVideosDisplay.innerHTML = `
                <button type="button" class="yourVideos-btn" id="addVideoButton">
                    <span class="material-symbols-outlined">add</span> Add Video
                </button>
            `;
            // Re-add event listener to the "Video ekle" button
            const addVideoButton = document.getElementById('addVideoButton');
            if (addVideoButton) {
                addVideoButton.addEventListener('click', openVideoAddToPlaylistModal);
            }
        }
    }
}

// Add event listener for the "Bitti" button in the video add to playlist modal
document.addEventListener('DOMContentLoaded', function() {
    const addVideosToPlaylistBtn = document.getElementById('addVideosToPlaylistBtn');
    if (addVideosToPlaylistBtn) {
        addVideosToPlaylistBtn.addEventListener('click', function() {
            updatePlaylistVideosDisplay(); // First update the display
            closeVideoAddToPlaylistModal(); // Then close the modal
        });
    }

    // Initial call to set the correct display on page load
    // This ensures the correct state (button or summary) is shown when the page loads
    updatePlaylistVideosDisplay();
});

// Video Add to Playlist Modal Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the modal is hidden on page load
    document.getElementById('videoAddToPlaylistModalOverlay').style.display = 'none';

    const searchInput = document.querySelector('#videoAddToPlaylistModal .modal-search input');
    const videoList = document.querySelector('#videoAddToPlaylistModal .modal-left-panel .modal-video-list');
    const videoItems = videoList.querySelectorAll('.modal-video-item');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.toLowerCase();

            videoItems.forEach(item => {
                const videoTitle = item.getAttribute('data-title').toLowerCase();
                if (videoTitle.includes(searchQuery)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// Drag and drop functionality for Home Tab sections
document.addEventListener('DOMContentLoaded', function() {
    const sectionsContainer = document.querySelector('.sections-container');
    if (sectionsContainer) {
        const sectionItems = sectionsContainer.querySelectorAll('.section-item');
        let draggedItem = null;
        
        // Her bölüme sıra numarası ver
        sectionItems.forEach((section, index) => {
            section.setAttribute('data-order', index + 1);
            section.setAttribute('draggable', 'true');
            
            section.addEventListener('dragstart', (e) => {
                draggedItem = section;
                section.classList.add('dragging');
            });
            
            section.addEventListener('dragend', () => {
                draggedItem = null;
                section.classList.remove('dragging');
                updateSectionOrder();
                checkForChanges();
            });

            section.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (section !== draggedItem) {
                    const rect = section.getBoundingClientRect();
                    const midY = rect.top + rect.height / 2;
                    
                    if (e.clientY < midY) {
                        section.parentNode.insertBefore(draggedItem, section);
                    } else {
                        section.parentNode.insertBefore(draggedItem, section.nextSibling);
                    }
                }
            });
        });
    }
});

// Sıra numaralarını güncelleme fonksiyonu
function updateSectionOrder() {
    const sections = document.querySelectorAll('.section-item');
    sections.forEach((section, index) => {
        section.setAttribute('data-order', index + 1);
        // Eğer bölümün başlığında sıra numarası varsa onu da güncelle
        const titleElement = section.querySelector('.section-item-flex span');
        if (titleElement) {
            const titleText = titleElement.textContent;
            // Başlıktaki sayıyı bul ve güncelle
            const updatedTitle = titleText.replace(/^\d+\)\s*/, `${index + 1}) `);
            titleElement.textContent = updatedTitle;
        }
    });
}