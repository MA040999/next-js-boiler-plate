
import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import './table.module.css';
import { usePosts } from '../../hooks/usePosts';
import { IPost } from '../../interfaces/post.interface';
import { useForm } from 'react-hook-form';
import { PostFormInputs, postFormSchema } from '../../schemas/formInputSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../Form/ErrorMessage';
import Input from '../Form/Input';
import TextArea from '../Form/TextArea';

let emptyPost: IPost = {
    
    userId: 0,
    id: 0,
    title: '',
    body: '',
};

const Table = () => {

    const [postCount, setPostCount] = useState(10)
    const { data: posts, isLoading, isFetching } = usePosts(postCount) 

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        clearErrors,
        getValues,
        reset,
        control,
      } = useForm<PostFormInputs>({
        resolver: zodResolver(postFormSchema),
        defaultValues: emptyPost,
      });

    const [postDialog, setPostDialog] = useState(false);
    const [deletePostDialog, setDeletePostDialog] = useState(false);
    const [deletePostsDialog, setDeletePostsDialog] = useState(false);
    const [post, setPost] = useState(emptyPost);
    const [selectedPosts, setSelectedPosts] = useState<IPost[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);

    const openNew = () => {
        reset(emptyPost)
        setSubmitted(false);
        setPostDialog(true);
    }

    const hideDialog = () => {
        clearErrors()   
        setSubmitted(false);
        setPostDialog(false);
    }

    const hideDeletePostDialog = () => {
        setDeletePostDialog(false);
    }

    const hideDeletePostsDialog = () => {
        setDeletePostsDialog(false);
    }

    const savePost = (data: PostFormInputs) => {
        console.log("🚀 ~ data", data)
        clearErrors()
        // setSubmitted(true);

        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Post Updated', life: 3000 });

        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Post Created', life: 3000 });
        
        // setPostDialog(false);
        
        // setPost(emptyPost);
    }

    const editPost = (post: IPost) => {
        setValue('body', post.body)
        setValue('title', post.title)
        setValue('userId', post.userId)
        setPostDialog(true);
    }

    const confirmDeletePost = (post: IPost) => {
        setPost(post);
        setDeletePostDialog(true);
    }

    const deletePost = () => {
        let _posts = posts?.filter(val => val.id !== post.id);
        // setPosts(_posts);
        setDeletePostDialog(false);
        setPost(emptyPost);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Post Deleted', life: 3000 });
    }

    const confirmDeleteSelected = () => {
        setDeletePostsDialog(true);
    }

    const deleteSelectedPosts = () => {
        let _posts = posts?.filter(val => !selectedPosts.includes(val));
        // setPosts(_posts);
        setDeletePostsDialog(false);
        setSelectedPosts([]);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Posts Deleted', life: 3000 });
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedPosts || !selectedPosts.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const actionBodyTemplate = (rowData: IPost) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPost(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePost(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Posts</h5>
        </div>
    );
    const postDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={handleSubmit(savePost)} />
        </React.Fragment>
    );
    const deletePostDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePostDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePost} />
        </React.Fragment>
    );
    const deletePostsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePostsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedPosts} />
        </React.Fragment>
    );

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={posts} selection={selectedPosts} onSelectionChange={(e) => setSelectedPosts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
                    header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="userId" header="User ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="title" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="body" header="Body" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog draggable={false} visible={postDialog} style={{ width: '450px' }} header="Post Details" modal className="p-fluid" footer={postDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <Input
                        label="Title"
                        register={register("title")}
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
                        register={register("body")}
                        error={errors.body}
                        placeholder="e.g. Some Body"
                    />
                    {errors.body?.message && (
                        <ErrorMessage message={errors.body.message} />
                    )}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <Input
                            label="User ID"
                            register={register("userId", {
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
                </div>
            </Dialog>

            <Dialog draggable={false} visible={deletePostDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePostDialogFooter} onHide={hideDeletePostDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {post && <span>Are you sure you want to delete <b>{post.title}</b>?</span>}
                </div>
            </Dialog>

            <Dialog draggable={false} visible={deletePostsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePostsDialogFooter} onHide={hideDeletePostsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {post && <span>Are you sure you want to delete the selected posts?</span>}
                </div>
            </Dialog>
        </div>
    );
}
    
export default Table