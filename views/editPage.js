const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout( html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}">

    <div class="form-group row">
      <label for="author" class="col-sm-2 control-label">Author Name</label>
      <div class="col-sm-10">
        <input id="author" name="author" type="text" class="form-control" value="${author.name}"/>
      </div>
    </div>

    <div class="form-group row">
      <label for="email" class="col-sm-2 ccol-form-label">Author Email</label>
      <div class="col-sm-10">
        <input id="email" name="email" type="email" placeholder="name@example.com" class="form-control" value="${author.email}"/>
      </div>
    </div>

    <div class="form-group row">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input name="title" type="text" class="form-control" value="${page.title}"/>
      </div>
    </div>

    <div class="form-group row">
      <label for="content" class="col-sm-2 col-form-label">Article Content</label>
      <div class="col-sm-10">
        <textarea id="content" name="content" rows="5" class="form-control">${page.content}</textarea>
      </div>
    </div>

    <div class="form-group row">
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == "open" ? "selected" : ""}>open</option>
          <option ${page.status == "closed" ? "selected" : ""}>closed</option>
        </select>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
`);
