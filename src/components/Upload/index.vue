<style lang="stylus">

.upload {
    width: 96%;
    height: auto;
    overflow: hidden;
    margin: 1rem auto;
    label {
        width: 40%;
        position: relative;
        display: block;
        text-align: center;
        height: 100%;
        line-height: 2.3333333333;
        background: #04be02;
        border-radius: 4px;
        color: #fff;
        float: left;
        padding: 1px;
        input[type='file'] {
            position: absolute;
            opacity: 0;
        }
    }
    a {
        width: 40%;
        float: right;
    }
}

.upload_main {
    input[type="text"] {
        font-size: 12px !important;
    }
}

</style>

<template>

<div class="upload_main">
    <my-input :placeholder="placeholder" :value.sync="fileAdress"></my-input>
    <div class="upload">
        <label for="{{name}}">
            <input type="file" :name="name" id="{{ id || name }}" :accept="accept" @click="fileInputClick" @change="fileInputChange(name)" :multiple="multiple" /> 选择文件
            <slot></slot>
        </label>
        <!-- <my-button  type="warn" text="上传图片"></my-button> -->
    </div>
</div>

</template>

<script>

import MyInput from 'vux/components/x-input'
import MyButton from 'vux/components/x-button'
export default {
    components: {
        MyButton,
        MyInput
    },
    props: {
        class: String,
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            twoWay: true
        },
        id: String,
        action: {
            type: String,
            required: true
        },
        accept: String,
        multiple: String,
        headers: Object,
        placeholder: String,
        fileAdress: String
    },
    data: function() {
        return {
            myFiles: [], // a container for the files in our field
            // fileAdress:''
        };
    },
    methods: {
        fileInputClick: function() {
            // click actually triggers after the file dialog opens
            this.$dispatch('onFileClick', this.myFiles);

        },
        fileInputChange: function(name) {
            // get the group of files assigned to this field
            var ident = this.id || this.name
            this.myFiles = document.getElementById(ident).files;
            this.$dispatch('onFileChange', this.myFiles);
            this.fileUpload(name)
        },
        _onProgress: function(e) {
            // this is an internal call in XHR to update the progress
            e.percent = (e.loaded / e.total) * 100;
            this.$dispatch('onFileProgress', e);
        },
        _handleUpload: function(file) {
            this.$dispatch('beforeFileUpload', file);
            var form = new FormData();
            var xhr = new XMLHttpRequest();
            try {
                let key = this._fileAdress(file)
                form.append('Content-Type', file.type || 'application/octet-stream');
                // our request will have the file in the ['file'] key
                form.append('file', file);
                form.append('token', token)
                form.append('key', key)

            } catch (err) {
                this.$dispatch('onFileError', file, err);
                return;
            }
            return new Promise(function(resolve, reject) {

                xhr.upload.addEventListener('progress', this._onProgress, false);

                xhr.onreadystatechange = function() {
                    if (xhr.readyState < 4) {
                        return;
                    }
                    if (xhr.status < 400) {
                        var res = JSON.parse(xhr.responseText);
                        // this.fileAdress = res.key + file.type.replace('image/', '.')
                        this.fileAdress = res.key
                            // this.$dispatch('onFileUpload', this.fileAddress, this.name);

                        resolve(file);
                    } else {
                        var err = JSON.parse(xhr.responseText);
                        err.status = xhr.status;
                        err.statusText = xhr.statusText;
                        this.$dispatch('onFileError', file, err);
                        reject(err);
                    }
                }.bind(this);

                xhr.onerror = function() {
                    var err = JSON.parse(xhr.responseText);
                    err.status = xhr.status;
                    err.statusText = xhr.statusText;
                    this.$dispatch('onFileError', file, err);
                    reject(err);
                }.bind(this);

                xhr.open('POST', this.action, true);
                if (this.headers) {
                    for (var header in this.headers) {
                        xhr.setRequestHeader(header, this.headers[header]);
                    }
                }
                xhr.send(form);
                this.$dispatch('afterFileUpload', file);
            }.bind(this));
        },
        fileUpload: function(name) {
            if (this.myFiles.length > 0) {
                // a hack to push all the Promises into a new array
                var arrayOfPromises = Array.prototype.slice.call(this.myFiles, 0).map(function(file) {

                    return this._handleUpload(file, name);

                }.bind(this));
                // wait for everything to finish
                Promise.all(arrayOfPromises).then(function(allFiles) {
                    this.$dispatch('onAllFilesUploaded', allFiles)
                    this.$dispatch('dispatchData', this.fileAdress, this.name)
                }.bind(this)).catch(function(err) {
                    this.$dispatch('onFileError', this.myFiles, err);
                }.bind(this));
            } else {
                // someone tried to upload without adding files
                var err = new Error("No files to upload for this field");
                this.$dispatch('onFileError', this.myFiles, err);
            }
        },
        _fileAdress: function(file) {
            let fileaddress

            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            let myDate = new Date();
            let year = myDate.getFullYear();
            let month = myDate.getMonth();
            let date = myDate.getDate();
            let ext = file.type.replace('image/', '')
            let md5 = S4() + S4() + S4() + S4();
            fileaddress = ext + '/' + year + '/' + month + '/' + date + '/' + md5 + '.' + ext
            return fileaddress
        }
    }
}

</script>
