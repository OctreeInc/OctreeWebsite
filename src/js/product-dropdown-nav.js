(function(){
  var s = document.createElement('style');
  s.textContent = '.dropdown-wrapper:hover .dropdown-content{display:block!important}';
  document.head.appendChild(s);

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.dropdown-trigger').forEach(function(el){
      el.style.cursor = "pointer";
      el.addEventListener('click', function(e){
        // If the trigger is a link, let it navigate naturally
        if (el.tagName === 'A' && el.getAttribute('href')) {
          return;
        }
        // Fallback for non-link triggers
        e.preventDefault();
        e.stopPropagation();
        window.location.href = 'product.html';
      });
    });
  });
})();
