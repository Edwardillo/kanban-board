/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import { Modal, Skeleton } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

const defaultValues = {
  id: Math.floor(Math.random() * 100000),
  title: '',
  description: '',
  tag: '',
  assignee: '',
  status: 'toDo',
  dueDate: '',
}

export default function FormModal({data, onCancel, onOk}) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if(data) {
      setLoading(true)
      setTimeout(() => setLoading(false), 5000);
    }
  }, [])

  const formik = useFormik({
    initialValues: data || defaultValues,
    onSubmit: values => {
      onOk(values, !data)
    },
  });

  return (
    <Modal
      title={formik.initialValues.title || "New Issue"}
      onCancel={onCancel}
      onOk={formik.handleSubmit}
      visible
      destroyOnClose
    >
      {isLoading ? <Skeleton active /> :
        <form onSubmit={formik.handleSubmit}>
          <div 
            css={css`
                  display: flex;
                  flex-direction: column;`
          }>
            <label htmlFor="title">Title</label>
            <input
                name="title"
                {...formik.getFieldProps("title")}
            />
            <label htmlFor="description">Description</label>
            <input
                name="description"
                {...formik.getFieldProps("description")}
            />
            <label htmlFor="tag">Tag</label>
            <input
                name="tag"
                {...formik.getFieldProps("tag")}
            />
            <label htmlFor="assignee">Assignee</label>
            <input
                name="assignee"
                {...formik.getFieldProps("assignee")}
            />
            <label htmlFor="dueDate">Due Date</label>
            <input
                type="date"
                name="dueDate"
                {...formik.getFieldProps("dueDate")}
            />
            </div>
        </form>
      }
    </Modal>
  );
}
