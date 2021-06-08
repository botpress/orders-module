import React, { FC, useState, useEffect } from 'react'
// @ts-ignore
import ContentPickerWidget from 'botpress/content-picker'

export const CreateOrder: FC<any> = props => {
  const [itemContentId, setItemContentId] = useState(props.itemContentId || '')
  const [qtyContentId, setQtyContentId] = useState(props.qtyContentId || '')
  const { bp } = props

  const onItemContentChanged = (element, force) => {
    if (element && (force || element.id !== itemContentId)) {
      setItemContentId(element.id)
    }
  }
  const onQtyContentChanged = (element, force) => {
    if (element && (force || element.id !== qtyContentId)) {
      setQtyContentId(element.id)
    }
  }

  const refreshItemContent = async () => {
    const id = itemContentId

    if (id && id.length) {
      const res = await bp.axios.get(`/content/element/${id}`)
      return onItemContentChanged(res.data, true)
    }
  }

  const refreshQtyContent = async () => {
    const id = qtyContentId

    if (id && id.length) {
      const res = await bp.axios.get(`/content/element/${id}`)
      return onQtyContentChanged(res.data, true)
    }
  }

  const updateParent = () => {
    props.onDataChanged({
      itemContentId,
      qtyContentId
    })
    if (itemContentId && qtyContentId) {
      props.onValidChanged(true)
    }
  }

  useEffect(() => {
    updateParent()
  }, [itemContentId, qtyContentId])

  return (
    <div>
      <h2>Create order</h2>
      <ContentPickerWidget
        categoryId="builtin_single-choice"
        contentType="builtin_single-choice"
        refresh={() => refreshItemContent()}
        itemId={itemContentId}
        onChange={onItemContentChanged}
        placeholder="Pick Item content"
      />
      <ContentPickerWidget
        categoryId="builtin_text"
        contentType="builtin_text"
        refresh={() => refreshQtyContent}
        itemId={qtyContentId}
        onChange={onQtyContentChanged}
        placeholder="Pick Quantity content"
      />
    </div>
  )
}
