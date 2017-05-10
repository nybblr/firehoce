# Firehoce

A [Recompose](https://github.com/acdlite/recompose)-style Higher Order Component for syncing a React component with a [Firebase](https://firebase.google.com) object.

State is synced with the [Re-base](https://github.com/tylermcginnis/re-base) Firebase adapter. Firehoce imitates Recompose's `withState()` higher order component.

# Example Usage

Here's a simple example of using `withFire()` with a stateless functional component:

```javascript
import React from 'react';
import Rebase from 're-base';
import withFire from 'firehoce';

let db = Rebase.createClass({ /* ... */ });

let Article = ({ article: { title, body, author } }) =>
  <article>
    <header>
      <h1>{title}</h1>
      <h2>by {author}</h2>
    </header>
    <main>{body}</main>
  </article>

let enhance = withFire(
  // Property name
  'article',
  // Setter name
  'setArticle',
  // Rebase instance
  db,
  // Firebase ref + options for Rebase#syncState()
  { ref: `article`,
    isNullable: true },
  // Initial value for synced property
  { title: 'Loading', body: 'Loading', author: '—' }
);

export default enhance(Article);
```

## Using the Setter

The last example doesn't use the setter, here's one that does:

```javascript
import React from 'react';
import Rebase from 're-base';
import withFire from 'firehoce';

let db = Rebase.createClass({ /* ... */ });

class Article extends Component {
  anonymize = () => {
    this.props.setArticle(article => ({
      ...article, author: 'Anonymous'
    }));
  }

  render() {
    let { article: { title, body, author } } = this.props;

    return (
      <article>
        <header>
          <h1>{title}</h1>
          <h2 onClick={this.anonymize}>by {author}</h2>
        </header>
        <main>{body}</main>
      </article>
    )
  }
}

let enhance = withFire(
  'article', 'setArticle', db,
  { ref: `article`,
    isNullable: true },
  { title: 'Loading', body: 'Loading', author: '—' }
);

export default enhance(Article);
```
