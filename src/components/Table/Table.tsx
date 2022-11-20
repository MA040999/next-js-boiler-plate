
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
import { CreatePostForm, createPostFormSchema, EditPostForm, editPostFormSchema } from '../../schemas/postFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditPost } from '../../hooks/useEditPost';
import { useCreatePost } from '../../hooks/useCreatePost';
import FormModal from '../Form/FormModal';
import { useBoundStore } from '../../store';
import shallow from 'zustand/shallow'

let emptyPost: IPost = {
    
    userId: 0,
    id: 0,
    title: '',
    body: '',

};

function isEditForm(data: CreatePostForm | EditPostForm): data is EditPostForm {
    return (data as EditPostForm).id !== undefined;
}

const Table = () => {

    const [perPageCount, setPerPageCount] = useState(10)
    const { data: posts, isLoading } = usePosts(perPageCount) 

    const { addHistory } = useBoundStore(
        (state) => ({ addHistory: state.addHistory }),
        shallow
    )

    const editPostMutation = useEditPost()
    const createPostMutation = useCreatePost()

    const editPostForm = useForm<EditPostForm>({
        resolver: zodResolver(editPostFormSchema),
        defaultValues: emptyPost,
    });

    const createPostForm = useForm<CreatePostForm>({
        resolver: zodResolver(createPostFormSchema),
        defaultValues: emptyPost,
    });

    const [editPostDialog, setEditPostDialog] = useState(false);
    const [createPostDialog, setCreatePostDialog] = useState(false);
    const [deletePostDialog, setDeletePostDialog] = useState(false);
    const [deletePostsDialog, setDeletePostsDialog] = useState(false);
    const [post, setPost] = useState(emptyPost);
    const [selectedPosts, setSelectedPosts] = useState<IPost[]>([]);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);

    const openNew = () => {
        setCreatePostDialog(true);
    }

    const hideCreatePostDialog = () => {
        setCreatePostDialog(false);
    }

    const hideEditPostDialog = () => {
        editPostForm.clearErrors()   
        setEditPostDialog(false);
    }

    const hideDeletePostDialog = () => {
        setDeletePostDialog(false);
    }

    const hideDeletePostsDialog = () => {
        setDeletePostsDialog(false);
    }

    const savePost = async (data: CreatePostForm | EditPostForm) => {
        
        try {

	        if(isEditForm(data)){
	            
	            await editPostMutation.mutateAsync(data)

                addHistory({
                    action: 'Edit Post',
                    createdAt: new Date().toISOString(),
                    name: 'Admin'
                })

                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Post Updated', life: 3000 });

                setEditPostDialog(false);

                return

	        }
                
            await createPostMutation.mutateAsync(data)

            addHistory({
                action: 'Add Post',
                createdAt: new Date().toISOString(),
                name: 'Admin'
            })

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Post Created', life: 3000 });

            setCreatePostDialog(false);

            createPostForm.reset()

        } catch (error) {

            toast.current.show({ severity: 'error', summary: 'Error', detail: error instanceof Error ? error.message : "Something went wrong", life: 3000 });
            
        }

    }

    const editPost = (post: IPost) => {
        editPostForm.setValue('body', post.body)
        editPostForm.setValue('title', post.title)
        editPostForm.setValue('userId', post.userId)
        editPostForm.setValue('id', post.id)
        setEditPostDialog(true);
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
        addHistory({
            action: 'Delete Post',
            createdAt: new Date().toISOString(),
            name: 'Admin'
        })
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
            <div className='flex'>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPost(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePost(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Posts</h5>
        </div>
    );
    const createPostDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideCreatePostDialog} />
            <Button label="Save" loading={createPostMutation.isLoading} icon="pi pi-check" className="p-button-text" onClick={createPostForm.handleSubmit(savePost)} />
        </React.Fragment>
    );

    const editPostDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideEditPostDialog} />
            <Button label="Save" loading={editPostMutation.isLoading} icon="pi pi-check" className="p-button-text" onClick={editPostForm.handleSubmit(savePost)} />
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

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="flex gap-4 mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} loading={isLoading} value={posts} selection={selectedPosts} onSelectionChange={(e) => setSelectedPosts(e.value)}
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

            <FormModal formType='create' errors={createPostForm.formState.errors} register={createPostForm.register} visible={createPostDialog} style={{ backgroundColor: 'red' }} header="Create Post" footer={createPostDialogFooter} onHide={hideCreatePostDialog}/>
            <FormModal formType='edit' errors={editPostForm.formState.errors} register={editPostForm.register} visible={editPostDialog} style={{ backgroundColor: 'red' }} header="Edit Post Details" footer={editPostDialogFooter} onHide={hideEditPostDialog}/>

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