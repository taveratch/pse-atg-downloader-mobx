import Input from 'src/common/components/Input'
import React from 'react'

class SitePage extends React.PureComponent {

  constructor(props) {
    super(props)
    
  }
  render() {
    return (
      <div>
        <h5>
          <b>แก้ไข</b>
        </h5>
        <Input name="name" label="ชื่อหน่วยงาน" defaultValue="" />
        <br />
        <Input name="name" label="ลิ้งค์" defaultValue="" />
        <br />
        <Input type="number" label="พอร์ท" defaultValue="" />
      </div>
    )
  }
}

export default SitePage