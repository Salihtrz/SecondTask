// script.js

// Slider variables
const slider = document.getElementById('videoSlider');
const slides = document.querySelectorAll('.video-special-slide');
const slideWidth = slides[0]?.offsetWidth || 0;
const slideMargin = 20; // margin-right değeri
let offset = 0; // Kaydırma miktarı

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('uploadImageButton').addEventListener('click', function () {
    // Bir dosya seçici oluşturalım
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    // Dosya seçildikten sonra resim yükleme işlemi
    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          // Yüklenen resmi göster
          const uploadedImageContainer = document.getElementById('uploadedImageContainer');
          uploadedImageContainer.style.display = 'inline-block'; // Görünür yap
          uploadedImageContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Yüklenen Resim">
                    <button class="close-btn">&times;</button>
                `;

          // Çarpı işaretine tıklanırsa resmi sil
          const closeButton = uploadedImageContainer.querySelector('.close-btn');
          closeButton.addEventListener('click', function () {
            uploadedImageContainer.innerHTML = ''; // İçeriği temizle
            uploadedImageContainer.style.display = 'none'; // Gizle
          });
        };

        reader.readAsDataURL(file); // Dosyayı okuyarak base64'e çevir
      }
    });

    // Dosya seçiciyi tetikle
    fileInput.click();
  });

});

// Bölümü kaldır işlevi
document.addEventListener('DOMContentLoaded', function() {
  const removeButtons = document.querySelectorAll('.remove-layout-section-option, #removeVideoOption, #removeFeaturedVideoOption, #removeSinglePlaylistOption');
  
  removeButtons.forEach(button => {
      button.addEventListener('click', function() {
          const sectionItem = this.closest('.section-item');
          if (sectionItem) {
              sectionItem.remove();
              checkForChanges(); // Değişiklikleri kontrol et ve butonları güncelle
          }
      });
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login-form');
  const passwordInput = document.getElementById('password');
  const toggleIcons = document.querySelectorAll('.toggle-password');

  // Şifre göster/gizle fonksiyonu
  toggleIcons.forEach(icon => {
      icon.addEventListener('click', function() {
          const formGroup = this.closest('.form-group');
          const input = formGroup.querySelector('input');
          
          if (input) {
              if (input.type === 'password') {
                  input.type = 'text';
                  this.classList.remove('fa-eye');
                  this.classList.add('fa-eye-slash');
              } else {
                  input.type = 'password';
                  this.classList.remove('fa-eye-slash');
                  this.classList.add('fa-eye');
              }
          }
      });
  });

  // Form gönderimi
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const email = document.getElementById('email').value;
          const password = passwordInput.value;
          const remember = document.getElementById('remember').checked;

          // Burada API'ye istek atılacak
          console.log('Login attempt:', { email, password, remember });
          
          // Başarılı giriş sonrası yönlendirme
          window.location.href = '/Watchly/UI/channel.html';
      });
  }
}); 

// Yorum textarea'sı için otomatik yükseklik ayarı
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.comment-input');
  const submitButton = document.querySelector('.comment-submit');
  const commentActions = document.querySelector('.comment-actions');
  const postTextarea = document.getElementById('postTextarea');
  const publishBtn = document.getElementById('postPublishBtn');
  const cancelBtn = document.getElementById('postCancelBtn');
  const imageBtn = document.getElementById('postImageBtn');
  const imageContainer = document.getElementById('postImageUploadContainer');
  const imageCloseBtn = document.getElementById('postImageCloseBtn');
  const imageInput = document.getElementById('postImageInput');
  const actionsDiv = document.getElementById('postCreateActions');
  const imagePreviewArea = document.getElementById('postImagePreviewArea');
  const videoBtn = document.getElementById('postVideoBtn');
  const overlay = document.getElementById('videoSelectOverlay');
  const closeBtn = document.getElementById('videoSelectCloseBtn');
  // Video kartlarını seç
  document.querySelectorAll('.post-video-upload-container-video-popup-content-video-card').forEach(function (card) {
    card.addEventListener('click', function () {
      // Video bilgilerini al
      const thumb = card.querySelector('img').src;
      const title = card.querySelector('.video-title').textContent;
      const meta = card.querySelector('.video-meta').textContent;
      const duration = card.querySelector('.video-duration').textContent;
      const date = card.querySelector('.video-date').textContent;

      // Seçilen video önizleme alanını doldur
      const preview = document.getElementById('selectedVideoPreview');
      preview.innerHTML = `
        <div class="post-video-upload">
          <button class="post-video-upload-remove-btn" id="removeSelectedVideoBtn">&times;</button>
          <div class="post-video-upload-thumbnail">
            <img class="post-video-upload-thumbnail-img" src="${thumb}">
            <span class="post-video-upload-duration">${duration}</span>
          </div>
          <div class="post-video-upload-info">
            <div class="post-video-upload-info-title">${title}</div>
            <div class="post-video-upload-info-meta-date">
              <div class="post-video-upload-info-meta">${meta}</div>
              <div class="post-video-upload-info-date">• ${date}</div>
            </div>
          </div>
        </div>
      `;
      preview.style.display = 'block';
      overlay.style.display = 'none';

      // İPTAL BUTONUNU AKTİF YAP
      if (cancelBtn) {
        cancelBtn.style.display = 'inline-block';
        cancelBtn.disabled = false;
        cancelBtn.style.opacity = '1';
        cancelBtn.style.pointerEvents = 'auto';
      }
      if (actionsDiv) actionsDiv.style.display = 'none';

      // Çarpı butonuna tıklayınca kaldır
      const removeBtn = document.getElementById('removeSelectedVideoBtn');
      if (removeBtn) {
        removeBtn.onclick = function () {
          preview.innerHTML = '';
          preview.style.display = 'none';
          if (actionsDiv) actionsDiv.style.display = 'flex';
        }
      }
    });
  });

  // Videoları HTML'de elle yazdığın için, videoListArea ile ilgili bir şey eklemene gerek yok!

  if (videoBtn && overlay && closeBtn) {
    // Videolar butonuna tıklayınca popup açılır
    videoBtn.addEventListener('click', function () {
      overlay.style.display = 'block';
    });

    // Çarpı butonuna tıklayınca popup kapanır
    closeBtn.addEventListener('click', function () {
      overlay.style.display = 'none';
    });

    // Overlay'in boş bir yerine tıklayınca popup kapanır
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  }

  if (imageBtn && imageContainer && imageCloseBtn && imageInput && actionsDiv && publishBtn && imagePreviewArea) {
    imageBtn.addEventListener('click', function () {
      imageContainer.style.display = 'block';
      actionsDiv.style.display = 'none';
    });

    imageCloseBtn.addEventListener('click', function () {
      imageContainer.style.display = 'none';
      imageInput.value = '';
      actionsDiv.style.display = 'flex';
      imagePreviewArea.innerHTML = '';
      publishBtn.disabled = true;
      publishBtn.style.background = '#eee';
      publishBtn.style.color = '#bbb';
      publishBtn.style.cursor = 'not-allowed';
    });

    imageInput.addEventListener('change', function () {
      imagePreviewArea.innerHTML = '';
      const files = Array.from(imageInput.files);
      if (files.length > 0) {
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '120px';
            img.style.maxHeight = '120px';
            img.style.borderRadius = '8px';
            img.style.objectFit = 'cover';
            img.style.border = '1px solid #e0e0e0';
            imagePreviewArea.appendChild(img);
          };
          reader.readAsDataURL(file);
        });
        // Butonu aktif yap
        publishBtn.disabled = false;
        publishBtn.style.background = '#000';
        publishBtn.style.color = '#fff';
        publishBtn.style.cursor = 'pointer';
      } else {
        // Butonu pasif yap
        publishBtn.disabled = true;
        publishBtn.style.background = '#eee';
        publishBtn.style.color = '#bbb';
        publishBtn.style.cursor = 'not-allowed';
      }
    });
  }

  if (postTextarea && publishBtn && cancelBtn) {
    // Başlangıçta butonları ayarla
    publishBtn.disabled = true;
    publishBtn.style.background = '#eee';
    publishBtn.style.color = '#bbb';
    publishBtn.style.cursor = 'not-allowed';
    cancelBtn.style.display = 'none';

    // Textarea'ya odaklanınca İptal butonu gözüksün
    postTextarea.addEventListener('focus', function () {
      cancelBtn.style.display = 'inline-block';
    });

    // Textarea'dan çıkınca ve içi boşsa İptal butonu gizlensin
    postTextarea.addEventListener('blur', function () {
      setTimeout(() => {
        if (!postTextarea.value.trim()) {
          cancelBtn.style.display = 'none';
        }
      }, 100);
    });

    // İçerik değiştikçe butonları kontrol et
    postTextarea.addEventListener('input', function () {
      // Otomatik yükseklik
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';

      // Yayınla butonunu aktif/pasif yap
      if (this.value.trim().length > 0) {
        publishBtn.disabled = false;
        publishBtn.style.background = '#000';
        publishBtn.style.color = '#fff';
        publishBtn.style.cursor = 'pointer';
      } else {
        publishBtn.disabled = true;
        publishBtn.style.background = '#eee';
        publishBtn.style.color = '#bbb';
        publishBtn.style.cursor = 'not-allowed';
      }
    });

    // İptal butonuna tıklanınca textarea ve butonlar sıfırlansın
    cancelBtn.addEventListener('click', function () {
      // Textarea'yı sıfırla
      if (postTextarea) {
        postTextarea.value = '';
        postTextarea.style.height = '40px';
      }
      // Yayınla butonunu pasif yap
      if (publishBtn) {
        publishBtn.disabled = true;
        publishBtn.style.background = '#eee';
        publishBtn.style.color = '#bbb';
        publishBtn.style.cursor = 'not-allowed';
      }
      // İptal butonunu gizle ve pasif yap
      cancelBtn.style.display = 'none';
      cancelBtn.disabled = true;
      cancelBtn.style.opacity = '0.5';
      cancelBtn.style.pointerEvents = 'none';

      // Seçilen video önizlemesini kaldır
      const preview = document.getElementById('selectedVideoPreview');
      if (preview) {
        preview.innerHTML = '';
        preview.style.display = 'none';
      }
      // Seçilen resimleri kaldır
      if (imagePreviewArea) imagePreviewArea.innerHTML = '';
      if (imageInput) imageInput.value = '';
      if (imageContainer) imageContainer.style.display = 'none';
      if (actionsDiv) actionsDiv.style.display = 'flex';
    });
  }
  if (postTextarea) {
    postTextarea.addEventListener('input', function () {
      this.style.height = 'auto'; // Önce sıfırla
      this.style.height = (this.scrollHeight) + 'px'; // İçeriğe göre ayarla
    });
  }

  if (textarea) {
    // Başlangıçta butonları gizle
    if (commentActions) {
      commentActions.style.display = 'none';
    }

    textarea.addEventListener('input', function () {
      // Textarea'yı otomatik boyutlandır
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';

      // Yorum yap butonunu aktifleştir/deaktifleştir
      if (submitButton) {
        submitButton.disabled = !this.value.trim();
      }
    });

    textarea.addEventListener('focus', function () {
      if (commentActions) {
        commentActions.style.display = 'flex';
      }
    });

    // İptal butonuna tıklandığında
    const cancelButton = document.querySelector('.comment-cancel');
    if (cancelButton) {
      cancelButton.addEventListener('click', function () {
        textarea.value = '';
        textarea.style.height = 'auto';
        commentActions.style.display = 'none';
        if (submitButton) {
          submitButton.disabled = true;
        }
      });
    }

    // Textarea dışına tıklandığında ve içerik boşsa butonları gizle
    document.addEventListener('click', function (e) {
      if (!textarea.contains(e.target) && !commentActions.contains(e.target)) {
        if (!textarea.value.trim()) {
          commentActions.style.display = 'none';
        }
      }
    });
  }


  // Şu anki sayfanın yolunu al
  const currentPath = window.location.pathname;

  // Tüm settings sidebar elemanlarını seç
  const setingsSidebarNavItems = document.querySelectorAll('.settings-sidebar-nav-item');

  // Her bir elemanı kontrol et ve uygun olanına 'active' ekle
  setingsSidebarNavItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (currentPath.includes(itemHref)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Tüm sidebar elemanlarını seç
  const sidebarNavItems = document.querySelectorAll('.nav-item');

  // Her bir elemanı kontrol et ve uygun olanına 'active' ekle
  sidebarNavItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (currentPath.includes(itemHref)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  resizeSlider();

  const leftArrow = document.querySelector('.slider-arrow.left');
  if (leftArrow) {
    leftArrow.style.display = 'none'; // Başlangıçta sol oku gizle
  }
  // Sayfa yüklendiğinde tüm sliderlardaki sol okları gizle
  document.querySelectorAll('.slider-container').forEach(container => {
    const leftArrow = container.querySelector('.slider-arrow.left');
    if (leftArrow) {
      leftArrow.style.display = 'none';
    }
  });
  // Çarpı işareti tıklama işlemi
  document.querySelectorAll('.close-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
      const videoCard = e.target.closest('.video-history-card');
      videoCard.remove();
    });
  });

  const tabs = document.querySelectorAll('.channel-videos-tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {

      // Tüm sekmelerden aktif sınıfını kaldır
      tabs.forEach((item) => {
        item.classList.remove('active');
      });

      // Tıklanan sekmeye aktif sınıfını ekle
      tab.classList.add('active');
    });
  });

  const input = document.querySelector('.history-search input');
  const div = document.querySelector('.history-search');

  if (input && div) {
    input.addEventListener('focus', function () {
      div.classList.add('focused');
    });

    input.addEventListener('blur', function () {
      div.classList.remove('focused');
    });
  }

  const input2 = document.querySelector('.newaccount-name input');
  const div2 = document.querySelector('.newaccount-name');

  if (input2 && div2) {
    input2.addEventListener('focus', function () {
      input2.classList.add('focused');
    });

    input2.addEventListener('blur', function () {
      input2.classList.remove('focused');
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleDescriptionBtn = document.getElementById("toggle-description");

  if (toggleDescriptionBtn) {
    toggleDescriptionBtn.addEventListener("click", function () {
      const description = document.getElementById("video-description");
      const isCollapsed = description.classList.contains("collapsed");

      if (isCollapsed) {
        description.classList.remove("collapsed");
        description.classList.add("expanded");
        this.textContent = "Show less";
      } else {
        description.classList.remove("expanded");
        description.classList.add("collapsed");
        this.textContent = "... more";
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navigation = document.querySelector('.navigation')
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  navigation.style.top = navbarHeight + 'px'; // Navbar'ın yüksekliğini ayarlıyoruz

  const channelHeader = document.querySelector('.channel-content-header');

  const observerOptions = {
    root: null, // Viewport (pencere) temel alınacak
    threshold: 0, // Elementin herhangi bir kısmı görünüyorsa tetikler
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Kanal başlığı görünmüyor
        navigation.classList.add('scrolled');
      } else {
        // Kanal başlığı tekrar görünür
        navigation.classList.remove('scrolled');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(channelHeader);

});
document.addEventListener('DOMContentLoaded', () => {
  const videoDetailPage = document.querySelector('.video-detail-page');
  const videoPlayer = document.querySelector('.video-player');

  // Dinamik yükseklik ayarı
  const videoDetailPageWidth = videoDetailPage.offsetWidth;
  videoPlayer.style.height = (videoDetailPageWidth / 3) + 'px';

});
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const categories = document.querySelector('.categories');
    if (window.scrollY > 50) { // 50px üzerinde kaydırma olduğunda
      categories.classList.add('scrolled');
    } else {
      categories.classList.remove('scrolled');
    }
  });
});

function toggleDropdownMenu(event) {
  // Tıklanan butonun yanındaki dropdown menüyü bul
  const dropdown = event.currentTarget.nextElementSibling;

  // Diğer açık dropdownları kapat
  document.querySelectorAll('.watchlater-dropdown-menu').forEach(menu => {
    if (menu !== dropdown) {
      menu.style.display = 'none';
    }
  });

  // Menü açık mı kapalı mı kontrol et ve aç/kapat
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
}

// Sayfa dışına tıklanınca dropdown kapansın
document.addEventListener('click', (e) => {
  const isDropdown = e.target.closest('.comment-section-dropdown');
  if (!isDropdown) {
    document.querySelectorAll('.comment-section-dropdown-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  }
});

// Sayfa yüklendiğinde ve ekran boyutu değiştiğinde sliderı yeniden boyutlandır
window.addEventListener('resize', () => {
  resizeSlider();
  offset = 0;
  slider.style.transform = `translateX(0px)`;
});

document.querySelectorAll('.menu ul li a').forEach(item => {
  item.addEventListener('mouseover', () => {
    item.style.backgroundColor = '#3b3b3b';
  });

  item.addEventListener('mouseout', () => {
    item.style.backgroundColor = '';
  });
});

window.addEventListener('load', function () {
  // Navbar'ın yüksekliğini alıyoruz
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const content = document.querySelector('.content');
  const bodyWidth = window.innerWidth;
  const videoDetailPageWidth = document.querySelector('.video-detail-page').offsetWidth;
  const videoPlayer = document.getElementById('video-player');
  const sidebar = document.querySelector('.sidebar');
  // Sidebar'ın top değerini navbar'ın yüksekliğine göre ayarlıyoruz
  sidebar.style.marginTop = navbarHeight + 'px';

  const computedStyles = window.getComputedStyle(content);
  const contentPadding = parseInt(computedStyles.paddingRight, 10); // padding-right
  const contentMarginLeft = parseInt(computedStyles.marginLeft, 10); // margin-left

  content.style.marginLeft = sidebar.offsetWidth + 35 + 'px';
  content.style.marginTop = navbarHeight + 20 + 'px';
  content.style.width = (bodyWidth - sidebar.offsetWidth - contentPadding - contentMarginLeft + 200) + 'px';

  videoPlayer.style.width = (videoDetailPageWidth / 5) + 'px'; // Video player genişliğini ayarlıyoruz

  const isVideoDetailPage = document.querySelector('.video-detail-page');
  const videodetail = document.querySelector('.video-detail');
  if (isVideoDetailPage) {
    videodetail.style.marginLeft = '0px';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const sidebar = document.querySelector('.sidebar');
  // Sidebar'ın top değerini navbar'ın yüksekliğine göre ayarlıyoruz
  sidebar.style.marginTop = navbarHeight + 'px';

  const dropdownButton = document.getElementById('visibilityDropdown');
  const dropdownOptions = document.getElementById('visibilityOptions');
  const sortValue = dropdownButton.querySelector('.playlist-sort-value');
  const videoGrid = document.querySelector('.video-grid');

  // Dropdown butonuna tıklandığında menüyü aç/kapat
  dropdownButton.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownOptions.classList.toggle('hidden');
  });

  dropdownOptions.addEventListener('click', (event) => {
    const selectedOption = event.target.closest('.dropdown-item');
    if (selectedOption) {
      const selectedValue = selectedOption.getAttribute('data-value');
      console.log("Seçilen değer:", selectedValue); // Hata ayıklama için

      sortValue.innerHTML = `
      ${selectedValue}
      <span class="material-symbols-outlined">
        keyboard_arrow_down
      </span>
    `;

      // Seçilen değere göre sıralama
      const videos = Array.from(videoGrid.children);

      if (selectedValue === "soon to be added") {
        videos.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
      } else if (selectedValue === "From A to Z") {
        videos.sort((a, b) =>
          a.dataset.title.trim().toLowerCase().localeCompare(
            b.dataset.title.trim().toLowerCase(),
            'tr',
            { sensitivity: 'base' }
          )
        );
      }

      // DOM'u sıfırla ve yeniden ekle
      videoGrid.innerHTML = "";
      videos.forEach(video => videoGrid.appendChild(video));

      // Dropdown menüsünü kapat
      dropdownOptions.classList.add('hidden');
    }
  });


  // Menü dışında bir yere tıklandığında dropdown'u kapat
  document.addEventListener('click', () => {
    dropdownOptions.classList.add('hidden');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Tab değiştirme fonksiyonu
  function switchTab(tabParam) {
      // Tüm tab içeriklerini gizle
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => content.classList.remove('active'));

      // Tüm tab butonlarından active sınıfını kaldır
      const tabButtons = document.querySelectorAll('.channel-videos-tab-btn');
      tabButtons.forEach(button => button.classList.remove('active'));

      // Seçilen tab'ı aktif et
      const selectedTab = document.getElementById(tabParam);
      if (selectedTab) {
          selectedTab.classList.add('active');
      }

      // Seçilen tab butonunu aktif et
      const selectedTabButton = document.querySelector(`.channel-videos-tab-btn[data-tab="${tabParam}"]`);
      if (selectedTabButton) {
          selectedTabButton.classList.add('active');
      }
  }

  // URL'den tab parametresini al ve tab'ı değiştir
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  if (tabParam) {
      switchTab(tabParam);
  }
});

// İkon dışındaki herhangi bir yere tıklayınca input alanını kapatır.
document.addEventListener("click", (event) => {
  const searchContainer = document.querySelector(".search-container");
  const popup = document.getElementById('popup');
  if (!searchContainer.contains(event.target)) {
    document.querySelector(".tab-search-input").style.display = "none";
  }
  if (event.target === popup) {
    closePopup();
  }
});

const videoCards = document.querySelectorAll('.video-watchlater-card');
const videoList = document.querySelector('.watchlater-videos');

videoCards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
});

videoList.addEventListener('dragover', (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(videoList, e.clientY);
  const dragging = document.querySelector('.dragging');
  if (afterElement == null) {
    videoList.appendChild(dragging);
  } else {
    videoList.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.video-watchlater-card:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function moveSlider(direction) {
  if (!slider || !slides.length) return; // Guard clause if elements don't exist

  const containerWidth = document.querySelector('.video-special-slider').offsetWidth;
  const visibleSlides = Math.floor(containerWidth / (slideWidth + slideMargin));
  const totalSlidesWidth = slides.length * (slideWidth + slideMargin);
  const leftArrow = document.querySelector('.slider-arrow.left');
  const rightArrow = document.querySelector('.slider-arrow.right');

  if (direction === 'left') {
    offset += (visibleSlides + 1) * (slideWidth + slideMargin); // daha fazla kaydırma
    if (offset > 0) offset = 0; // Başlangıç sınırı
  } else if (direction === 'right') {
    offset -= (visibleSlides + 1) * (slideWidth + slideMargin); // daha fazla kaydırma
    const maxOffset = -(totalSlidesWidth - containerWidth); // en sağa kaydırma limiti

    if (offset < maxOffset) {
      offset = maxOffset; // Son videoyu tam görmek için limit
    }
  }

  // Okların görünürlüğünü kontrol et
  if (offset === 0) {
    leftArrow.style.display = 'none'; // En başa geldiğinde sol oku gizle
  } else {
    leftArrow.style.display = 'block';
  }

  const maxOffset = -(totalSlidesWidth - containerWidth);
  if (offset <= maxOffset) {
    rightArrow.style.display = 'none'; // En sona geldiğinde sağ oku gizle
  } else {
    rightArrow.style.display = 'block';
  }

  slider.style.transform = `translateX(${offset}px)`;
}

// Sidebar'ı açıp kapatmak için toggle fonksiyonu
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const sidebardata = document.querySelectorAll('item-name');
  const isSettingsPage = document.querySelector('.settings-page');
  const isVideoDetailPage = document.querySelector('.video-detail-page');
  const videodetail = document.querySelector('.video-detail');

  if (!isSettingsPage && !isVideoDetailPage) {
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

  if (isSettingsPage) {
    sidebar.classList.toggle('close'); // Sidebar'ı göster ya da gizle
    if (sidebar.classList.contains('close')) {
      sidebardata.forEach(link => {
        link.style.display = 'none';
      });
      document.getElementById('settingsOverlay').style.display = 'none';
      document.body.style.overflow = ''; // Sayfa scrollunu aktif et
    }
    else {
      sidebardata.forEach(link => {
        link.style.display = 'block';
      });

      document.getElementById('settingsOverlay').style.display = 'block';
      document.body.style.overflow = 'hidden'; // Sayfa scrollunu devre dışı bırak
    }
  }

  if (isVideoDetailPage) {
    sidebar.classList.toggle('close'); // Sidebar'ı göster ya da gizle
    if (sidebar.classList.contains('close')) {
      sidebardata.forEach(link => {
        link.style.display = 'none';

      });
      document.getElementById('videoDetailOverlay').style.display = 'none';
      document.body.style.overflow = ''; // Sayfa scrollunu aktif et
      videodetail.style.marginLeft = '0px';
    }
    else {
      sidebardata.forEach(link => {

        link.style.display = 'block';
      });
      document.getElementById('videoDetailOverlay').style.display = 'block';
      document.body.style.overflow = 'hidden'; // Sayfa scrollunu devre dışı bırak
    }
  }
}

function toggleDropdown(event) {
  const allDropdowns = document.querySelectorAll
    ('.navbar-video-menu, .yourVideos-navbar-video-menu, .navbar-notification-menu, .user-dropdown-menu, .video-dropdown-menu, .slide-movie-dropdown-menu, .channel-video-action-dropdown-menu, .search-video-action-dropdown-menu, .history-action-dropdown-menu, .likedvideos-action-dropdown-menu, .trends-action-dropdown-menu, .video-detail-dropdown-menu, .watchlater-action-dropdown-menu, .channel-playlist-sort-dropdown-menu');
  const channelPage = document.querySelector('.channel-page')
  const channelVideos = document.getElementById('videos')
  // Tıklanan öğeyi bul
  const dropdownMenu = event.target.nextElementSibling;
  const channelVideosDropdown = event.target.nextElementSibling;

  allDropdowns.forEach(dropdown => {
    if (dropdown !== dropdownMenu) {
      dropdown.style.display = "none";
    }
  });

  // Menü zaten açıksa kapat, yoksa aç
  if (dropdownMenu.style.display === "block") {
    dropdownMenu.style.display = "none";
  } else {
    dropdownMenu.style.display = "block";

    // Dropdown'ın pozisyonunu kontrol et
    const dropdownRect = dropdownMenu.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Eğer dropdown ekranın altında kalacaksa yukarı doğru aç
    if (channelPage && channelVideos && dropdownRect.bottom > windowHeight) {
      channelVideosDropdown.style.position = 'absolute';
      channelVideosDropdown.style.bottom = '100px';
      channelVideosDropdown.style.top = 'auto';
      channelVideosDropdown.style.right = '0';
      channelVideosDropdown.style.marginBottom = '8px';
    }
    else if (dropdownRect.bottom > windowHeight) {
      dropdownMenu.style.position = 'absolute';
      dropdownMenu.style.bottom = '100%';
      dropdownMenu.style.top = 'auto';
      dropdownMenu.style.right = '0';
      dropdownMenu.style.marginBottom = '8px';
    }
  }

  // Menü dışında bir yere tıklanırsa menüyü kapat
  window.addEventListener("click", function (event) {
    if (!event.target.matches('.more-icon') && !event.target.matches('.dropdown-menu') &&
      !event.target.matches('.dropdown-menu li') && !event.target.matches("img") &&
      !event.target.matches(".navbar-video-container span") && !event.target.matches(".navbar-notification-container span")
      && !event.target.matches(".yourVideos-navbar-video-container span") && !event.target.matches(".channel-playlist-filter span")) {

      dropdownMenu.style.display = "none";
    }
  });
}

function showPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function showTab(tabId) {
  // Tüm içerik alanlarını gizle
  const tabcontents = document.querySelectorAll('.tab-content');
  tabcontents.forEach(content => content.classList.remove('active'));

  // Seçilen alanı göster
  document.getElementById(tabId).classList.add('active');

  // Tüm içerik alanlarını gizle
  const gridcontents = document.querySelectorAll('.grid-content');
  gridcontents.forEach(content => content.classList.remove('active'));

  // Seçilen alanı göster
  document.getElementById(tabId).classList.add('active');
}


function toggleSearch() {
  const searchInput = document.querySelector(".tab-search-input");
  searchInput.style.display = searchInput.style.display === "block" ? "none" : "block";
  if (searchInput.style.display === "block") {
    searchInput.querySelector("input").focus();
  }
}

function handleSearch(event) {
  if (event.key === "Enter") {
    const searchValue = event.target.value;

    // Tüm tab içeriklerini gizle
    const tabcontents = document.querySelectorAll('.tab-content');
    tabcontents.forEach(content => content.classList.remove('active'));

    // Arama sonuçları tabını göster
    const searchResultsTab = document.getElementById('searchResults');
    searchResultsTab.classList.add('active');

    // Input alanını temizle
    event.target.value = "";
    // Arama input alanını gizle
    document.querySelector(".tab-search-input").style.display = "none";
  }
}

function moveSlide(direction, sliderId) {
  const sliderContainer = document.querySelector(`.slider-container[data-slider="${sliderId}"]`);
  const slider = sliderContainer.querySelector('.slider');
  const slides = slider.querySelectorAll('.slide');
  const slideWidth = slides[0].offsetWidth;
  let currentOffset = parseInt(slider.dataset.offset) || 0;
  const leftArrow = sliderContainer.querySelector('.slider-arrow.left');
  const rightArrow = sliderContainer.querySelector('.slider-arrow.right');

  if (direction === 'left') {
    if (currentOffset < 0) {
      currentOffset += slideWidth;
    }
  } else if (direction === 'right') {
    if (Math.abs(currentOffset) < (slides.length - getVisibleSlidesCount(sliderContainer)) * slideWidth) {
      currentOffset -= slideWidth;
    }
  }

  // Okların görünürlüğünü kontrol et
  if (currentOffset === 0) {
    leftArrow.style.display = 'none'; // En başa geldiğinde sol oku gizle
  } else {
    leftArrow.style.display = 'block';
  }

  const maxOffset = -(slides.length - getVisibleSlidesCount(sliderContainer)) * slideWidth;
  if (currentOffset <= maxOffset) {
    rightArrow.style.display = 'none'; // En sona geldiğinde sağ oku gizle
  } else {
    rightArrow.style.display = 'block';
  }

  slider.style.transform = `translateX(${currentOffset}px)`;
  slider.dataset.offset = currentOffset;
}

function resizeSlider() {
  const sliderContainers = document.querySelectorAll('.slider-container');

  sliderContainers.forEach(container => {
    const slider = container.querySelector('.slider');
    const slides = slider.querySelectorAll('.slide');
    const visibleSlides = getVisibleSlidesCount(container);
    const containerWidth = container.offsetWidth;

    // Her bir slaytın genişliğini yeniden ayarla
    const slideWidth = containerWidth / visibleSlides;
    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`;
    });

    // Mevcut kaymayı sıfırla
    slider.style.transform = `translateX(0px)`;
    slider.dataset.offset = 0;
  });
}

function getVisibleSlidesCount(container) {
  const containerWidth = container.offsetWidth;

  if (containerWidth >= 1600) {
    return 5; // 1600px ve üzeri için 5 video göster
  } else if (containerWidth >= 1200) {
    return 4; // 1200px ve üzeri için 4 video göster
  } else if (containerWidth >= 800) {
    return 3; // 800px ve üzeri için 3 video göster
  }
  else if (containerWidth >= 400) {
    return 2; // 400px ve üzeri için 2 video göster
  } else {
    return 1; // Daha küçük ekranlar için 1 video göster
  }
}

const subscribeButton = document.querySelectorAll('.subscribe-button');
function toggleSubscription(subscribeButton) {
  if (subscribeButton.classList.contains('subscribed')) {
    // Abonelikten çık
    subscribeButton.classList.remove('subscribed');
    subscribeButton.textContent = 'Subscribe';
  } else {
    // Abone ol
    subscribeButton.classList.add('subscribed');
    subscribeButton.textContent = 'Unsubscribe';
  }
}

function showEmailPopup() {
  alert('E-posta adresi: example@example.com');
}

// Geri bildirim modalını aç
function openFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'block';
  document.getElementById('feedbackOverlay').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Sayfa scrollunu devre dışı bırak
}

// Geri bildirim modalını kapat
function closeFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'none';
  document.getElementById('feedbackOverlay').style.display = 'none';
  document.body.style.overflow = ''; // Sayfa scrollunu tekrar aktif et
}

// Overlay'e tıklandığında modalı kapat
document.getElementById('feedbackOverlay').addEventListener('click', function () {
  closeFeedbackModal();
});

// Modal içinde tıklamaları engelleme
document.getElementById('feedbackModal').addEventListener('click', function (event) {
  event.stopPropagation();
});

// Resim yükleme ve önizleme işlevselliği
document.addEventListener('DOMContentLoaded', function () {
  const imageUpload = document.getElementById('image-upload');
  const imagePreview = document.getElementById('image-preview');

  if (imageUpload && imagePreview) {
    imageUpload.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Yüklenen resim">
                        <button class="remove-image" onclick="removeImage()">×</button>
                    `;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

});

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.querySelector('.login-form');
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  // Şifre göster/gizle fonksiyonu
  togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const input = this.parentElement.querySelector('input');
          if (!input) return;
          
          const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
          input.setAttribute('type', type);
          
          // İkon değiştirme
          const icon = this.querySelector('i');
          if (type === 'password') {
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
          } else {
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
          }
      });
  });

  // Şifre eşleşme kontrolü
  confirmPasswordInput.addEventListener('input', function() {
      if (this.value !== passwordInput.value) {
          this.setCustomValidity('Passwords do not match');
      } else {
          this.setCustomValidity('');
      }
  });

  // Form gönderimi
  registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const terms = document.getElementById('terms').checked;

      if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
      }

      if (!terms) {
          alert('Please agree to the Terms of Service and Privacy Policy');
          return;
      }

      // Burada API'ye istek atılacak
      console.log('Register attempt:', { username, email, password, terms });
      
      // Başarılı kayıt sonrası yönlendirme
      window.location.href = '/Watchly/UI/channel.html';
  });
}); 

