# My Thyme website created using MERN stack

## Project Goals

The purpose of this project is to create a website that allows an admin user to upload cooking recipe blog posts and have other users read and comment on those posts.

## Requirements

### Login

    Users will be able to log in to their accounts to identify their comments and restrict blog posting ability to admins.

### Create Recipes

    Admin users will be able to store recipes to the database that can be reused across blogs.
    Recipes will include:
    - Name
    - Ingredients
    - Instructions
    - Cook time
    - Prep time

### Create blog posts

    Admin users will be able to create and edit blogs with the following features.
    - Write and format text for the post
    - Embed photos within the post
    - Embed recipes within the post

### Write comments

    Logged in users will be able to post comments below blog posts and respond to each other's comments.

### Moderate comments

    Admin users will be able to delete or block comments of the other users

### Search for blogs and recipes

    Users will be able to search through blogs and recipes by title or tag

### Leave rating

    Logged in users will be able to leave a rating on recipes

## api routes

### /public

    unrestricted endpoints

#### /api/public/user

    -get: public info for all users

#### /api/public/user/signup

    -post: sign up a new user

#### /api/public/user/login

    -post: login a new user

#### /api/public/user/:id

    -get: public info for one user

#### /api/public/recipe

    -get: all recipes

#### /api/public/recipe/:id

    -get: one recipe

#### /api/public/blog

    -get: all blogs

#### /api/public/blog/:id

    -get: one blog

#### /api/public/blog/:id/comments

    -get: all comments on one blog

#### /api/public/blog/:id/comments/:commentid

    -get: one comment on one blog
    -patch: edit one comment on one blog
    -delete: delete one comment on one blog

### /private

    restricted to a user who is logged in or an admin

#### /api/private/user/:id

    restricted by id
    -get: all info for one user
    -patch: edit user
    -delete: delete user

#### /api/private/recipe/:id

    -post: rate recipe

#### /api/private/blog/:id

    -post: comment on a blog
    -patch: edit comment on a blog
        restricted by id or admin

## /admin

### /user

#### /api/admin/user

    -get: get admin info on all users

#### /api/admin/user/:id

    -get: get admin info on one user
    -patch: edit admin info on one user
    -delete: delete one user

### /recipe

#### /api/admin/recipe

    -post: add a new recipe

#### /api/admin/recipe/:id

    -patch: edit recipe
    -delete: delete recipe

### /blog

#### /api/admin/blog

    -post: add a new blog

#### /api/admin/blog/:id

    -patch: edit blog
    -delete: delete blog

#### /api/admin/blog/:id/comment/:commentid

    -patch: edit comment flags
    -delete: delete comment

## Models needed

### user

    - id
    - username
    - password
    - accessLevel // are they an admin or user
    - email
    - signUpDate
    - standing // do they have any strikes against their account

### recipe

    - id
    - cuisineType
    - prepTime
    - cookTime
    - servings
    - ingredients
    - instructions
    - title
    - author
    - average rating
    - tags

### blog

    - id
    - author
    - text
    - publishDate
    - title
    - coverImg
    - tags

### comment

    - id
    - post
    - author
    - text
    - publishDate
    - parentComment
    - hidden

### rating

    -userID
    -recipeID
    -rating
