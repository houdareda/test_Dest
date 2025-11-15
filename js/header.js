document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const mobileDropdowns = document.querySelectorAll('.nav_links .dropdown');
  const mobileMenuBtn = document.querySelector('.mobile_menu_btn');
  const navLinks = document.querySelector('.nav_links');
  const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
  const currencyDropdown = document.querySelector('.currency.dropdown a');
  const currencyModalOverlay = document.getElementById('currencyModalOverlay');
  const currencyModalClose = document.getElementById('currencyModalClose');
  const currencyOptions = document.querySelectorAll('.headr-currency-option');
  const searchTrigger = document.getElementById('searchTrigger');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('searchClearBtn');
  const searchSubmitBtn = document.querySelector('.search-submit-btn');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const mobileSearchModal = document.getElementById('mobileSearchModal');
  const mobileSearchClose = document.getElementById('mobileSearchClose');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const mobileSearchSubmit = document.querySelector('.headr-mobile-search-submit');
  const cartTrigger = document.getElementById('cartTrigger');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItems = document.getElementById('cartItems');
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  const mobileCartModal = document.getElementById('mobileCartModal');
  const mobileCartClose = document.getElementById('mobileCartClose');
  const mobileCartItems = document.getElementById('mobileCartItems');
  const mobileEmptyCartMessage = document.getElementById('mobileEmptyCartMessage');
  const mobileCartTotal = document.getElementById('mobileCartTotal');

  const searchData = [
    'Cairo Day Tours',
    'Pyramids of Giza',
    'Luxor Temple',
    'Aswan High Dam',
    'Red Sea Diving',
    'Desert Safari',
    'Nile Cruise',
    'Alexandria Tour',
    'Hurghada Snorkeling',
    'Sharm El Sheikh',
    'Valley of the Kings',
    'Karnak Temple',
    'Abu Simbel',
    'Egyptian Museum',
    'Khan El Khalili',
    'Philae Temple',
    'Edfu Temple',
    'Kom Ombo Temple',
    'Dendera Temple',
    'White Desert'
  ];

  let lastScrollTop = 0;
  let scrollThreshold = 50;
  let activationPoint = 100;
  let isScrolling = false;

  function handleScroll() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScrollTop <= activationPoint) {
          header.classList.remove('header-active');
          header.classList.remove('header-hidden');
          lastScrollTop = currentScrollTop;
          isScrolling = false;
          return;
        }
        const scrollDifference = Math.abs(currentScrollTop - lastScrollTop);
        if (scrollDifference > scrollThreshold) {
          if (currentScrollTop > lastScrollTop) {
            header.classList.add('header-hidden');
            header.classList.remove('header-active');
          } else {
            header.classList.remove('header-hidden');
            header.classList.add('header-active');
          }
          lastScrollTop = currentScrollTop;
        }
        isScrolling = false;
      });
    }
    isScrolling = true;
  }

  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 10);
  });
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      header.classList.remove('header-hidden');
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop <= activationPoint) {
        header.classList.remove('header-active');
      }
    }
  });

  mobileDropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    const dropdownMenu = dropdown.querySelector('.dropdown_menu');
    if (dropdownLink && dropdownMenu) {
      dropdownLink.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          mobileDropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              const otherMenu = otherDropdown.querySelector('.dropdown_menu');
              if (otherMenu) {
                otherMenu.classList.remove('show');
              }
            }
          });
          dropdownMenu.classList.toggle('show');
        }
      });
      const dropdownItems = dropdownMenu.querySelectorAll('li a');
      dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
          if (window.innerWidth < 992) {}
        });
      });
    }
  });
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 992) {
      const isDropdownClick = e.target.closest('.dropdown');
      if (!isDropdownClick) {
        mobileDropdowns.forEach(dropdown => {
          const menu = dropdown.querySelector('.dropdown_menu');
          if (menu) {
            menu.classList.remove('show');
          }
        });
      }
    }
  });
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
      mobileDropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown_menu');
        if (menu) {
          menu.classList.remove('show');
        }
      });
    }
  });

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      if (menuIcon) {
        if (navLinks.classList.contains('active')) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-times');
        } else {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      }
      if (!navLinks.classList.contains('active')) {
        const dropdownMenus = document.querySelectorAll('.nav_links .dropdown_menu');
        dropdownMenus.forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        if (menuIcon) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuIcon) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      }
    });
  }

  function openCurrencyModal() {
    if (window.innerWidth <= 1050) {
      currencyModalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeCurrencyModal() {
    currencyModalOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  if (currencyDropdown) {
    currencyDropdown.addEventListener('click', function(e) {
      if (window.innerWidth <= 1050) {
        e.preventDefault();
        openCurrencyModal();
      }
    });
  }
  if (currencyModalClose) {
    currencyModalClose.addEventListener('click', closeCurrencyModal);
  }
  if (currencyModalOverlay) {
    currencyModalOverlay.addEventListener('click', function(e) {
      if (e.target === currencyModalOverlay) {
        closeCurrencyModal();
      }
    });
  }
  currencyOptions.forEach(option => {
    option.addEventListener('click', function() {
      const currency = this.getAttribute('data-currency');
      const symbol = this.getAttribute('data-symbol');
      if (currencyDropdown) {
        const currencySpan = currencyDropdown.querySelector('span');
        if (currencySpan) {
          currencySpan.textContent = symbol;
        }
      }
      closeCurrencyModal();
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currencyModalOverlay && currencyModalOverlay.classList.contains('show')) {
      closeCurrencyModal();
    }
  });
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1050 && currencyModalOverlay && currencyModalOverlay.classList.contains('show')) {
      closeCurrencyModal();
    }
  });

  function toggleSearchDropdown() {
    const isOpen = searchDropdown.classList.contains('show');
    if (isOpen) {
      closeSearchDropdown();
    } else {
      openSearchDropdown();
    }
  }
  function openSearchDropdown() {
    searchDropdown.classList.add('show');
    if (searchInput) {
      searchInput.focus();
    }
  }
  function closeSearchDropdown() {
    searchDropdown.classList.remove('show');
    resetSearch();
  }
  function resetSearch() {
    if (searchInput) {
      searchInput.value = '';
    }
    if (searchSuggestions) {
      searchSuggestions.innerHTML = '';
    }
    currentSuggestionIndex = -1;
    updateClearButton();
  }
  let searchTimeout;
  let currentSuggestionIndex = -1;
  if (searchTrigger) {
    searchTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (window.innerWidth <= 1050) {
        openMobileSearch();
      } else {
        toggleSearchDropdown();
      }
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      updateClearButton();
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (query.length > 0) {
          showSuggestions(query);
        } else {
          clearSuggestions();
        }
      }, 300);
    });
    searchInput.addEventListener('keydown', function(e) {
      handleSearchKeydown(e);
    });
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', function() {
      resetSearch();
      if (searchInput) {
        searchInput.focus();
      }
    });
  }
  function updateClearButton() {
    if (clearSearchBtn && searchInput) {
      if (searchInput.value.trim().length > 0) {
        clearSearchBtn.style.display = 'block';
      } else {
        clearSearchBtn.style.display = 'none';
      }
    }
  }
  function showSuggestions(query) {
    const filteredData = searchData.filter(item => item.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    if (filteredData.length > 0) {
      const suggestionsHTML = filteredData.map((item, index) => {
        const highlightedItem = highlightMatch(item, query);
        return `<div class="suggestion-item" data-index="${index}" data-value="${item}">${highlightedItem}</div>`;
      }).join('');
      searchSuggestions.innerHTML = suggestionsHTML;
      const suggestionElements = searchSuggestions.querySelectorAll('.suggestion-item');
      suggestionElements.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
          selectSuggestion(this.getAttribute('data-value'));
        });
      });
    } else {
      searchSuggestions.innerHTML = '<div class="no-suggestions">No results found</div>';
    }
  }
  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }
  function clearSuggestions() {
    if (searchSuggestions) {
      searchSuggestions.innerHTML = '';
    }
    currentSuggestionIndex = -1;
  }
  function selectSuggestion(value) {
    if (searchInput) {
      searchInput.value = value;
    }
    performSearch(value);
  }
  function handleSearchKeydown(e) {
    const suggestions = searchSuggestions.querySelectorAll('.suggestion-item');
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentSuggestionIndex < suggestions.length - 1) {
          currentSuggestionIndex++;
          updateSuggestionHighlight(suggestions);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentSuggestionIndex > 0) {
          currentSuggestionIndex--;
          updateSuggestionHighlight(suggestions);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (currentSuggestionIndex >= 0 && suggestions[currentSuggestionIndex]) {
          selectSuggestion(suggestions[currentSuggestionIndex].getAttribute('data-value'));
        } else {
          if (searchInput && searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
          }
        }
        break;
      case 'Escape':
        closeSearchDropdown();
        break;
    }
  }
  function updateSuggestionHighlight(suggestions) {
    suggestions.forEach((suggestion, index) => {
      if (index === currentSuggestionIndex) {
        suggestion.classList.add('selected');
      } else {
        suggestion.classList.remove('selected');
      }
    });
  }
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (searchInput && searchInput.value.trim()) {
        performSearch(searchInput.value.trim());
      }
    });
  }
  if (mobileSearchClose) {
    mobileSearchClose.addEventListener('click', function() {
      closeMobileSearch();
    });
  }
  if (mobileSearchModal) {
    mobileSearchModal.addEventListener('click', function(e) {
      if (e.target === mobileSearchModal) {
        closeMobileSearch();
      }
    });
  }
  if (mobileSearchSubmit) {
    mobileSearchSubmit.addEventListener('click', function(e) {
      e.preventDefault();
      if (mobileSearchInput && mobileSearchInput.value.trim()) {
        performSearch(mobileSearchInput.value.trim());
        closeMobileSearch();
      }
    });
  }
  function openMobileSearch() {
    if (mobileSearchModal) {
      mobileSearchModal.classList.add('show');
      if (mobileSearchInput) {
        mobileSearchInput.focus();
      }
    }
  }
  function closeMobileSearch() {
    if (mobileSearchModal) {
      mobileSearchModal.classList.add('closing');
      setTimeout(() => {
        mobileSearchModal.classList.remove('show');
        mobileSearchModal.classList.remove('closing');
      }, 300);
      if (mobileSearchInput) {
        mobileSearchInput.value = '';
      }
    }
  }
  const popularSearchTags = document.querySelectorAll('.quick-search-tag');
  popularSearchTags.forEach(tag => {
    tag.addEventListener('click', function() {
      const searchTerm = this.textContent.trim();
      performSearch(searchTerm);
    });
  });
  function performSearch(query) {
    closeSearchDropdown();
    closeMobileSearch();
    alert(`Searching for: ${query}`);
  }
  document.addEventListener('click', function(e) {
    if (searchDropdown && searchDropdown.classList.contains('show')) {
      if (!searchDropdown.contains(e.target) && !searchTrigger.contains(e.target)) {
        closeSearchDropdown();
      }
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (searchDropdown && searchDropdown.classList.contains('show')) {
        closeSearchDropdown();
      }
      if (mobileSearchModal && mobileSearchModal.classList.contains('show')) {
        closeMobileSearch();
      }
    }
  });
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1050) {
      closeMobileSearch();
    } else {
      closeSearchDropdown();
    }
  });

  let cartData = [
    {
      id: 1,
      title: "Hurghada: Giftun Island Tour with Snorkeling & Buffet Lunch",
      date: "Thu, Nov 6, 2025",
      time: "8:30 AM",
      location: "hurghada",
      adults: 1,
      language: "english",
      price: 17.50,
      image: "img/photo_6813975525858.webp"
    },
    {
      id: 2,
      title: "Hurghada: Quad, Jeep, Camel and Buggy Safari with BBQ Dinner",
      date: "Mon, Dec 1, 2025",
      time: "6:00 AM",
      location: "hurghada",
      adults: 1,
      language: "english",
      price: 20.00,
      image: "img/photo_67bc30811b730.jpg"
    }
  ];
  function initCart() {
    updateCartDisplay();
    updateCartCount();
  }
  function updateCartDisplay() {
    if (cartData.length === 0) {
      if (cartItems) cartItems.style.display = 'none';
      if (emptyCartMessage) emptyCartMessage.style.display = 'block';
      if (mobileCartItems) mobileCartItems.style.display = 'none';
      if (mobileEmptyCartMessage) mobileEmptyCartMessage.style.display = 'block';
      if (cartTotal) cartTotal.textContent = '€0.00';
      if (mobileCartTotal) mobileCartTotal.textContent = '€0.00';
    } else {
      if (cartItems) cartItems.style.display = 'block';
      if (emptyCartMessage) emptyCartMessage.style.display = 'none';
      if (mobileCartItems) mobileCartItems.style.display = 'block';
      if (mobileEmptyCartMessage) mobileEmptyCartMessage.style.display = 'none';
      renderCartItems();
      updateCartTotal();
    }
  }
  function renderCartItems() {
    const desktopHTML = cartData.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-info">${item.date} • ${item.time}</div>
          <div class="cart-item-info">${item.adults} Adult • ${item.language}</div>
          <div class="cart-item-price-section">
            <div class="cart-item-price">€${item.price.toFixed(2)}</div>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');
    const mobileHTML = desktopHTML;
    if (cartItems) cartItems.innerHTML = desktopHTML;
    if (mobileCartItems) mobileCartItems.innerHTML = mobileHTML;
  }
  function updateCartTotal() {
    const total = cartData.reduce((sum, item) => sum + item.price, 0);
    if (cartTotal) cartTotal.textContent = `€${total.toFixed(2)}`;
    if (mobileCartTotal) mobileCartTotal.textContent = `€${total.toFixed(2)}`;
  }
  function updateCartCount() {
    const count = cartData.length;
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  function showCartDropdown() {
    if (cartDropdown) {
      cartDropdown.classList.add('show');
    }
  }
  function hideCartDropdown() {
    if (cartDropdown) {
      cartDropdown.classList.remove('show');
    }
  }
  function openMobileCart() {
    if (mobileCartModal) {
      mobileCartModal.classList.add('show');
    }
  }
  function closeMobileCart() {
    if (mobileCartModal) {
      mobileCartModal.classList.add('closing');
      setTimeout(() => {
        mobileCartModal.classList.remove('show');
        mobileCartModal.classList.remove('closing');
      }, 300);
    }
  }
  if (cartTrigger) {
    cartTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (window.innerWidth <= 1050) {
        openMobileCart();
      } else {
        if (cartDropdown && cartDropdown.classList.contains('show')) {
          hideCartDropdown();
        } else {
          showCartDropdown();
        }
      }
    });
  }
  document.addEventListener('click', function(e) {
    if (cartDropdown && cartDropdown.classList.contains('show')) {
      if (!cartTrigger.contains(e.target) && !cartDropdown.contains(e.target)) {
        hideCartDropdown();
      }
    }
  });
  if (mobileCartClose) {
    mobileCartClose.addEventListener('click', closeMobileCart);
  }
  if (mobileCartModal) {
    mobileCartModal.addEventListener('click', function(e) {
      if (e.target === mobileCartModal) {
        closeMobileCart();
      }
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (cartDropdown && cartDropdown.classList.contains('show')) {
        hideCartDropdown();
      }
      if (mobileCartModal && mobileCartModal.classList.contains('show')) {
        closeMobileCart();
      }
    }
  });
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1050) {
      closeMobileCart();
    } else {
      hideCartDropdown();
    }
  });
  window.addToCart = function(item) {
    cartData.push(item);
    updateCartDisplay();
    updateCartCount();
  };
  window.removeFromCart = function(itemId) {
    cartData = cartData.filter(item => item.id !== itemId);
    updateCartDisplay();
    updateCartCount();
  };
  window.clearCart = function() {
    cartData = [];
    updateCartDisplay();
    updateCartCount();
  };
  initCart();
});