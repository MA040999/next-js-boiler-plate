import { Dialog, DialogProps } from 'primereact/dialog'
import React from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { CreatePostForm, EditPostForm } from '../../schemas/postFormSchema'
import ErrorMessage from './ErrorMessage'
import Input from './Input'
import TextArea from './TextArea'

type FormModalProps = {
    register: UseFormRegister<CreatePostForm>
    errors: Partial<FieldErrorsImpl<CreatePostForm>>
    formType: 'create'
} | {
    register: UseFormRegister<EditPostForm>
    errors: Partial<FieldErrorsImpl<EditPostForm>>
    formType: 'edit'
};

const FormModal = ({ className, header, visible, formType, style, onHide, register, errors, footer }: FormModalProps & DialogProps) => {

  return (
    <Dialog draggable={false} visible={visible} style={{ width: '450px', ...style }} header={header} modal className={`p-fluid ${className}`} footer={footer} onHide={onHide}>
        <div className="field">
            <Input
                label="Title"
                register={ formType === 'edit' ? register("title") : register("title") }
                type="text"
                error={errors.title}
                placeholder="e.g. Some Title"
            />
            {errors.title?.message && (
                <ErrorMessage message={errors.title.message} />
            )}
        </div>
        <div className="field">
            <TextArea
                label="Body"
                register={formType === 'edit' ? register("body") : register("body")}
                error={errors.body}
                placeholder="e.g. Some Body"
            />
            {errors.body?.message && (
                <ErrorMessage message={errors.body.message} />
            )}
        </div>
               
        <div className="field">
            <Input
                label="User ID"
                register={formType === 'edit' ? register("userId", {
                    valueAsNumber: true,
                }) : register("userId", {
                    valueAsNumber: true,
                })}
                type="number"
                error={errors.userId}
                placeholder="e.g. 1435"
            />
            {errors.userId?.message && (
                <ErrorMessage message={errors.userId.message} />
            )}
        </div>
    </Dialog>
  )
}

export default FormModal