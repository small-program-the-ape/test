const gulp = require('gulp')
const connect = require('gulp-connect')
const bs = require('browser-sync')

gulp.task('default',()=>{
    return new Promise((resolve,reject)=>{
        console.log('hello gulp')
        resolve()
    })
})

//复制单个文件
gulp.task('copyHtml',()=>{
    return gulp.src('./src/public/manage.html').pipe(gulp.dest('dist/public'))
})

//复制所有文件
gulp.task('copyAllHtml',()=>{
    return gulp.src('./src/public/*.html').pipe(gulp.dest('dist/public')).pipe(connect.reload())
})

// //复制指定文件
gulp.task('copyAjs',()=>{
    return gulp.src(['./src/public/js/a.js','./src/public/js/b.js']).pipe(gulp.dest('dist/public/js'))
})

// //排除某些文件
gulp.task('copyOtherJs',()=>{
    return gulp.src(['./src/public/js/*.js','!.src/public/js/a.js','!.src/public/js/c.js']).pipe(gulp.dest('dist/public/js'))
})


// //添加多个后缀
gulp.task('copyImage',()=>{
    return gulp.src('./src/public/img/*.{png,jpg,gif}').pipe(gulp.dest('dist/public/img'))
})


// //执行多个任务
//   series 串行同步   parallel并发同步执行
gulp.task('build',gulp.parallel('copyAllHtml','copyOtherJs','copyImage',(done)=>{
    // return gulp.start('myWatchMangage')
    done()
    // return console.log('执行成功')
}))

// //监事文件的变化
gulp.task('myWatchMangage',()=>{
    return gulp.watch('./src/public/index.html',gulp.series('build'))
})


// //文件删除
// //先下载nodejs  的del模块
const del = require('del')
gulp.task('myDelete',(done)=>{
    done()
    // del(['./dist/public/img/*.{gif,png,jpg}'])
    //  删除删除所有文件包括文件夹
    return del(['./dist/**'])
})


// //先清空dist文件夹
// //执行build进行复制
// //打开我的监视器，监事文件的变化
gulp.task('reBuild',gulp.series('myDelete','build',gulp.parallel('myWatchMangage',(done)=>{
    console.log('监听开始')
    done()
})))


//下载  gulp-connect
//默认打开根目录下面的index。html
//livereoad  是否实时刷新
//  默认端口号8080，指定port

gulp.task('server',()=>{
    connect.server({
        root:'dist/public',
        livereload:true
    })
})

//当代码修改时实时刷新
gulp.task('autoReload',gulp.parallel('server',(done)=>{
    done()
    return gulp.watch('./src/public/index.html',gulp.series('build'))
}))

//浏览器的同步测试工具
gulp.task('browserSync',gulp.parallel('reBuild',()=>{
    // init   参数
    //  1.资源文件[]   2.服务器对象配置  {服务器{跟目录}}
    let files = ['./dist/**/*.html','./dist/**/*.js']
    bs.init(files,{server:{baseDir:'./dist/public'}})
}))

//合并文件
const concat = require('gulp-concat')
gulp.task('concatJs',()=>{
    return gulp.src('./src/public/js/*.js')
        .pipe(concat('doubleyong.js'))
        .pipe(gulp.dest('./dist/public/js'))
})


//压缩js文件
const uglify = require('gulp-uglify')
gulp.task('concatUglify',()=>{
    return gulp.src('./src/public/js/test.js')
        .pipe(uglify({
            mangle:false,//是否改变量名，默认为true
            compress:false,//是否完全压缩，默认为true
            output:{
                comments:'all'  //保留注释
            }
        }))
        .pipe(gulp.dest('./dist/public/js'))
})

//压缩css文件

const cleancss = require('gulp-clean-css')
gulp.task('cleanCss',()=>{
    return gulp.src('./src/public/css/style.css')
        .pipe(cleancss({leve1:{
            2:{
                //不想合并选择器
                mergeAdjacentRules: false,
                mergeIntoShorthands: false

            }
            }})).pipe(gulp.dest('./dist/public/css'))
})


//重命名
const rename = require('gulp-rename')
//babel es6>>es5
gulp.task('renameJs',()=>{
    return gulp.src('./src/public/js/text.js')
        .pipe(concat('dubleyong.js'))
        .pipe(gulp.dest('./dist/public/js'))
        .pipe(uglify())
        .pipe(rename('dubleyong.min.js'))
        .pipe(gulp.dest('./dist/public/js'))
})

//css加前缀

const autoPre = require('gulp-autoprefixer')
gulp.task('autoPrefixer',()=>{
    return gulp.src('./src/public/css/style.css')
        .pipe(autoPre({
            //设置需要兼容哪些浏览器
            browsers:['ie 9','Firefox>=10','last 20 versions']
        }))
        .pipe(gulp.dest('./dist/public/css'))
})


//图片压缩
const imageMin = require('gulp-imagemin')
gulp.task('imageMin',()=>{
    return gulp.src('./src/public/img/*')
        .pipe(imageMin)
        .pipe(gulp.dest('./dist/public/img'))
})

//改变链接

const cherrio = require('gulp-cheerio')
gulp.task('changeLink',()=>{
    return gulp.src('./src/public/manage.html')
        .pipe(cherrio(function ($) {
            $('link').remove()
            $('script').remove()
            $('head').append("<link rel='stylesheet' href='css/dubleyong.css'/>")
            $('body').append("<script src='js/dubleyong.js'></script>")
        }))
        .pipe(gulp.dest('./dist/public'))
})


//babel
// const babel = require('gulp-babel')
// const babellenv = require('babel-preset-env')
// gulp.task('babelJs',()=>{
//     return gulp.src('./src/public/js/ajaxFn.js')
//         .pipe(babel({
//             presets:['@babel/preset-env']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/public/js'))
// })


const less = require('gulp-less')
gulp.task('less',()=>{
    return gulp.src('./src/public/less/*.less')
        .pipe(gulp.dest('./src/public/css'))
})

//注 gulp-babel 插件 ，还需要安装@babel/core   @babel/preset-env
//代码如下
// 'devDependencies':{
//     'gulp-babel':'^8.0.0',
//     '@babel/core':'^7.4.3',
//     '@babel/preset-env':'^7.4.3'
// }


alert('祖国母亲70华诞')

                                       console.log('祖国母亲七十华诞快乐')
















