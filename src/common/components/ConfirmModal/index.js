import Button from 'src/common/components/Buttons/Button'
import I18n from 'src/common/I18n'
import React from 'react'

export default props => (
  <div>
    <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.body}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">{I18n.t('common.close')}</button>
            <Button type="button" className="btn" data-dismiss="modal" onClick={props.onYes}>{props.yesButtonLabel}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)