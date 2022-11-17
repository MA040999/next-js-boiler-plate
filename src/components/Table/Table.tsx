
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyType } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './table.module.css';
import { usePosts } from '../../hooks/usePosts';
import { IPost } from '../../interfaces/post.interface';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { postFormInputs, postFormSchema } from '../../schemas/formInputSchema';
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

    // const [posts, setPosts] = useState<IPost[]>([]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
        control,
      } = useForm<postFormInputs>({
        resolver: zodResolver(postFormSchema),
        defaultValues: emptyPost,
      });
    

    const [postDialog, setPostDialog] = useState(false);
    const [deletePostDialog, setDeletePostDialog] = useState(false);
    const [deletePostsDialog, setDeletePostsDialog] = useState(false);
    const [post, setPost] = useState(emptyPost);
    const [selectedPosts, setSelectedPosts] = useState<IPost[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setPost(emptyPost);
        setSubmitted(false);
        setPostDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setPostDialog(false);
    }

    const hideDeletePostDialog = () => {
        setDeletePostDialog(false);
    }

    const hideDeletePostsDialog = () => {
        setDeletePostsDialog(false);
    }

    const savePost = () => {
        setSubmitted(true);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Post Updated', life: 3000 });

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Post Created', life: 3000 });
        
        setPostDialog(false);
        setPost(emptyPost);
    }

    const editPost = (post: IPost) => {
        setPost({...post});
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

    // const onInputChange = (e, name: keyof IPost) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _post = post;
    //     _post[`${name}`] = val;

    //     setPost(_post);
    // }

    // const onInputNumberChange = (e, name) => {
    //     const val = e.value || 0;
    //     let _post = {...post};
    //     _post[`${name}`] = val;

    //     setPost(_post);
    // }

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
                {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} /> */}
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    // const imageBodyTemplate = (rowData: IPost) => {
    //     return <img src={`images/post/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="post-image" />
    // }

    // const priceBodyTemplate = (rowData: IPost) => {
    //     return formatCurrency(rowData.price);
    // }

    // const ratingBodyTemplate = (rowData: IPost) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    // const statusBodyTemplate = (rowData: IPost) => {
    //     return <span className={`post-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

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
            {/* <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span> */}
        </div>
    );
    const postDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePost} />
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
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="userId" header="User ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="title" header="Title" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="body" header="Body" sortable style={{ minWidth: '16rem' }}></Column>
                    {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column> */}
                    {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    {/* <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column> */}
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={postDialog} style={{ width: '450px' }} header="Post Details" modal className="p-fluid" footer={postDialogFooter} onHide={hideDialog}>
                {/* {post.image && <img src={`images/post/${post.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={post.image} className="post-image block m-auto pb-3" />} */}
                <div className="field">
                    {/* <label htmlFor="name">Name</label> */}
                    {/* <InputText id="name" value={post.name} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !post.title })} /> */}
                    {/* {submitted && !post.name && <small className="p-error">Name is required.</small>} */}
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
                        error={errors.title}
                        placeholder="e.g. Some Body"
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
                    {/* <div className="field col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={post.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div> */}
                    <div className="field col">
                        <Input
                            label="User ID"
                            register={register("userId")}
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

            <Dialog visible={deletePostDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePostDialogFooter} onHide={hideDeletePostDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {post && <span>Are you sure you want to delete <b>{post.title}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deletePostsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePostsDialogFooter} onHide={hideDeletePostsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {post && <span>Are you sure you want to delete the selected posts?</span>}
                </div>
            </Dialog>
        </div>
    );
}
    
export default Table