import React from 'react'
import CMS from 'netlify-cms'
import path from 'path'
import markdownToHtml from './markdownToHtml'
import { collections } from '../admin/config.yml'

const Article = ({ entry, getAsset }) => {
  const base = path.dirname(entry.getIn(['path']))
  const title = entry.getIn(['data', 'title'])
  const description = entry.getIn(['data', 'description'])
  const notification = entry.getIn(['data', 'notification'])
  return (
    <div className="articlePreview">
      <h1 className="articlePreview__title">{title}</h1>
      {description && (
        <div className="articlePreview__description">
          {description}
        </div>
      )}
      {notification && (
        <div className="articlePreview__notification">
          {notification}
        </div>
      )}
      <div dangerouslySetInnerHTML={{
        __html: markdownToHtml({
          markdown: entry.getIn(['data', 'body']),
          base,
          getAsset
        })
      }} />
    </div>
  )
}

// register this preview for all the categories
collections.forEach(({ name }) => {
  CMS.registerPreviewTemplate(name, Article)  
})

// in admin/article.css
CMS.registerPreviewStyle("/article.css")