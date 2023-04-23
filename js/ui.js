document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

const renderRecipe = (data, id) => {
  const recipes = document.querySelector('.recipes');

  const html = `
      <div class="card-panel recipe white row">
        <img src="./img/dish.png" alt="recipe thumb" />
        <div class="recipe-details">
          <div class="recipe-title">Edame Noodles</div>
          <div class="recipe-ingredients">Edame Beans, Noodels, Garlic oil</div>
        </div>
        <div class="recipe-delete">
          <i class="material-icons">delete_outline</i>
        </div>
      </div>
  `

  recipes.innerHTML += html
}

export {renderRecipe}
