'use client';
import {
  InboxOutlined,
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  LinkOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Popconfirm, Card, Tooltip, Pagination } from 'antd';
import styles from './index.module.scss';

const { Dragger } = Upload;
const { Meta } = Card;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const mockData = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function UploadPage() {
  const handleCopyBa64Content = () => {
    message.success('复制成功');
  };

  return (
    <section className={styles.container}>
      <div style={{ height: 300 }}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者拖拽上传</p>
          <p className="ant-upload-hint">
            支持单次或批量上传。 严禁上传涉黄、涉政、涉恐或其他违禁文件。
          </p>
        </Dragger>
      </div>
      <div className={styles.imageList}>
        {mockData.map((item, index) => {
          return (
            <Card
              key={index}
              style={{ width: 250 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Tooltip placement="bottom" title="复制base64" key="base64">
                  <CopyOutlined onClick={handleCopyBa64Content} />
                </Tooltip>,
                <Tooltip placement="bottom" title="复制链接" key="href">
                  <LinkOutlined />
                </Tooltip>,
                <Popconfirm
                  key="delete"
                  title="确认删除？"
                  description="此操作不可逆，删除后将无法访问图片"
                  okText="确认"
                  cancelText="我在想想"
                >
                  <Tooltip placement="bottom" title="删除">
                    <DeleteOutlined />
                  </Tooltip>
                  ,
                </Popconfirm>,
              ]}
            >
              <Meta title="图片名称" description="上传时间" />
            </Card>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={1}
          total={400}
          // simple
          showSizeChanger={false}
          pageSize={12}
          showTotal={(total) => `共 ${total} 条数据`}
        />
      </div>
    </section>
  );
}
