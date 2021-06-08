## Git Commit Message Guideline
This repo adheres to custom angular-emoji commit guideline.

### Format
Each commit message consits of a **header**, a **body** and a **footer**. The 
header includes one or more **emojis**, a **type**, a **scope** and a 
**subject**.
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory but the **body** and **footer** are optionals. The 
header's **scope** is optional but the **emoji(s)**, **commit type** and 
**subject** are required.
The header must not be longer than **50 characters**.
Any line of the body or footer must not be longer than **72 characters**.

### Types and Emoji
Type must be one of the following with one of the designated emojis:
* **Initial Commit** [🎉 Party Popper](http://emojipedia.org/party-popper/): 
Start of the project

* **feat** [✨ Sparkles](http://emojipedia.org/sparkles/): A new feature

* **fix**: Fixes a bug, a typo or a security issue
  * bugfix [🐛 Bug](http://emojipedia.org/bug/)
  * security fix [🔒 Lock](https://emojipedia.org/lock/)
  * typo fix [✏ Pencil](http://emojipedia.rog/pencil)

* **hotfix** [🚑 Ambulance](https://emojipedia.org/ambulance/): A hotfix

* **refactor** 
[♻️ Black Universal Recycling Symbol](http://emojipedia.org/black-universal-recycling-symbol/)
: A code change that neither fixes a bug nor adds a feature
  * move or rename resources
  [🚚 Delivery Truck](http://emojipedia.org/delivery-truck/)
  * remove code [🗑️ Wastebasket](http://emojipedia.org/wastebasket/)
  * improve error handling [🥅 Goal Net](http://emojipedia.org/goal-net/)
  * work in progress (WIP)
  [🚧 Construction Sign](http://emojipedia.org/construction-sign/)

* **perf** [⚡ High Voltage](http://emojipedia.org/high-voltage/): A code change
that improves performance

* **build** [🔨 Hammer](http://emojipedia.org/hammer/): Changes that affect the 
build system or external dependencies
  * add dependency [➕ Plus Sign](http://emojipedia.org/plus-sign)
  * remove dependency [➖ Minus Sign](http://emojipedia.org/minus-sign)
  * upgrade dependency [⬆ Up Arrow](http://emojipedia.org/up-arrow)
  * downgrade dependency [⬇ Down Arrow](http://emojipedia.org/down-arrow)
  * pin dependency version [📌 Pushpin](http://emojipedia.org/pushpin)
  * change node package files [📦 Package](http://emojipedia.org/package/)
  * deployment [🚀 Rocket](http://emojipedia.org/rocket/)
  * git ignore changes
  [🙈 See-No-Evil Monkey](http://emojipedia.org/see-no-evil-monkey)  
  * config files [🔧 Wrench](http://emojipedia.org/wrench/)
  * database related [🗃 Card File Box](http://emojipedia.org/card-file-box/)

* **docs** [📚 Books](http://emojipedia.org/books/): Documentation only changes
  * licensing [📄 Page Facing Up](http://emojipedia.org/page-facing-up/)
  * comments [💡 Bulb](http://emojipedia.org/bulb/)
  * logs [🔊 Speaker High Volume](http://emojipedia.org/speaker-high-volume/)
  * i18n [🌐 Globe With Meridians](http://emojipedia.org/globe-with-meridians/)


  
* **style** [🎨 Artist Palette](http://emojipedia.org/artist-palette/): Changes 
that do not affect the meaning of the code (white-space, formatting, missing 
semi-colons, etc)

* **test**
[🚨 Police Cars Revolving Light](http://emojipedia.org/police-cars-revolving-light/)
: Adding missing tests or correcting existing tests
  * adds a test
   [✅ Check Mark Button](http://emojipedia.org/check-mark-button/)
  * make a test pass [✔ Check Mark](http://emojipedia.org/check-mark/)

* **revert** 
[⏪ Fast Reverse Button](http://emojipedia.org/fast-reverse-button/): Reverts a 
previous commit. It should begin with `revert: `, followed by the header of the 
reverted commit. In the body it should say: `This reverts commit <hash>.`, where
 the hash is the SHA of the commit being reverted


### Condition Emojis
This emojis can be added to the type emoji to notify about certain condition:
* **bookmark** [🔖 Bookmark](http://emojipedia.org/bookmark/)
* **breaking change** [💥 Boom](http://emojipedia.org/boom/)
* **deprecation** [⚰ Coffin](http://emojipedia.org/coffin/)

### Scope
The scope should be the name of the npm package affected.
The following is the list of supported scopes:

* **api**
* **frontend**
* **packaging**: used for changes that change the npm package layout in all of
our packages, e.g. public path changes, package.json changes done to all
packages, d.ts file/format changes, changes to bundles, etc.
* none/empty string: useful for `style`, `test` and `refactor` changes that are 
done across all packages (e.g. `style: add missing semicolons`) and for docs 
changes that are not related to a specific package (e.g. 
`docs: fix typo in LICENSE`).

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not 
"changed" nor "changes". The body should include the motivation for the change 
and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also
the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space 
or two newlines. The rest of the commit message is then used for this.