# Dash 2 Trade

## Working on Task

*Use **npm** not yarn*

*Never push directly to dev or master*

*Never mix refactoring and features in commits*

### Flow

1. Create a new branch off of dev

> Use clickup to create the ticket branch, that way the branch will be linked correctly to the ticket
>
>Branch name format: :taskId:_:taskName:_:username:
>
> **Example** - `CU-ae27d3_Auto-generated-naming_John-smith`

2. Make your changes in the new branch.
3. Ask other Dev to review and merge your code into the Dev branch.
4. Before we go live (public) lets merge to main after merging to dev.

### Code Style Rules

*If you work with a legacy file - refactor it (if time permits) - **No class components are allowed***

*Don't write as you want - write as it written*

- Use [Prettier](https://prettier.io/) for code format
- Don't push uncommented `console.logs` you have been used for debugging
- Constants should be `UPPER_CAMEL_CASE` but enums and types in `PascalCase`
- Use `TODO:` and `FIXME:` keywords to mark places where changes will be needed later (and don't forget to remove them
  after being updated)
- Use small z-indexes
- Use relative CSS units (`rem`,`vh`,`%`) over `px` whenever it's possible

### Naming

- Use 'is*' prefix for state naming (examples: `isActive`, `isLight`)
- Use 'on*' for defining prop names for handle functions (examples: `onChange`, `onClick`)
- Use 'handle*' prefix for defining handle functions (examples: `handleSubmitButtonClick`, `handleNameInputChange`)

There always should be a pair:

    <Component
      ...
      onSomething={handleSomething}
      ...
    />

## Important Links:

[API Structure](https://d2t.info/api/v1/docs#/)

[Figma Document](https://www.figma.com/file/hiWQojvv5wUltAsHyU8a35/Dash2Trade?node-id=1%3A4046&t=2ttMrxGVJptd0YxA-1)
