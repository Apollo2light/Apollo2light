var fluidity = require('fluidity');


module.exports = function (grunt) {
    //配置信息
    grunt.initConfig({
        //读取package.json文件
        pkg: grunt.file.readJSON('package.json'),
        //jshint格式检查插件的相关配置
        jshint: {
            all: ['*.js']
        },
        //合并任务
        concat: {
            //concat基础配置
            options: {
                //多个源文件cancat时的连接符
                // separator:';',
                //去除源码注释
                stripBanners: true,
                //合并后文件开头
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
                //合并后文件末尾
                footer: '/*! <%= pkg.description %> */',
                //在cancat进程前的处理
                process: function (src) {
                    return ';' + src;
                },
                //开启sourcemap
                //记录编译后代码到原始代码的映射关系
                sourceMap: true,
            },
            //concat打包配置:单个任务
            dist: {
                src: ['js/index.js', 'js/jquery.js'],
                // src: ['js/index.js'],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>-prod.js'
            }

            //concat打包配置:多个任务
            // dev:{
            //     //concat打包配置
            //     src: ['js/index.js','js/jquery.js'],
            //     dest:'dist/<%= pkg.name %>- <%= pkg.version %>-dev.js'
            // },
            // prod:{
            //     //concat打包配置
            //     src: ['js/index.js','js/jquery.js'],
            //     dest:'dist/<%= pkg.name %>- <%= pkg.version %>-prod.js'
            // }
        },
        //压缩js任务
        uglify: {
            options: {
                //混淆变量名
                mangle: {
                    toplevel: true
                },
                //压缩时需要支持的功能
                //其他选项：https://github.com/mishoo/UglifyJS#compress-options
                compress: {
                    //消除所有console信息
                    drop_console: true
                },
                //美化格式
                beautify: {
                    //缩进变成2
                    indent_level: 2
                },
                //查看打包效率，配合maxmin使用
                report: false,
                //支持ie8
                ie8: true
            },
            target: {
                //需要压缩的文件
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>-prod.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>-prod.js']
                }
            }
        },

        //stylus转css任务
        stylus: {
            //编译时
            compile: {
                options: {
                    //指定输出目录
                    relativeDest: 'dist',
                    //是否需要压缩
                    compress: true,
                    //包含注释信息
                    linenos: false,

                    //引入其他css文件
                    // paths: ['css'],
                    // import:['index.css'],
                    //编译时使用其他插件
                    //use: [fluidity],

                },
                //指定路径
                // files: {
                //     'dist/result.css': 'css/index.styl'
                // }
                files: {
                    '<%= pkg.name %>-<%= pkg.version %>.min.css': 'css/*.styl'
                }
            }
        },

        //压缩css任务
        cssmin: {
            target: {
                files: {
                    'dist/iconfont.min.css': 'assets/font_1991087_mwyiccnpagf/iconfont.css'
                }
            }
        },
        //清理目录
        clean: {
            all: ['dist/']
        },
        //拷贝文件
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['index.html', 'iconfont.ttf', 'iconfont.woff', 'iconfont.woff2'],
                    dest: 'dist'
                }]
            }
        },
        //插入资源
        usemin: {
            html: 'dist/index.html',
            options: {
                //自定义
                blockReplacements: {
                    img: function (block) {
                        return '<img src="' + block.dest + '">';
                    }
                }
            }
        },
        //压缩html
        htmlmin: {
            options: {
                //移除注释
                removeComments: true,
                //去除空格
                collapseWhitespace: true
            },
            html: {
                files: {
                    'dist/index.min.html': 'dist/index.html'
                }
            }
        },
        //压缩图片
        imagemin: {
            static: {
                options: {
                    //压缩等级
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['*.{png,jpg}'],
                    dest: 'dist/'
                }]
            }
        },
        //自动监控
        watch: {
            scripts: {
                files: ['./**/*.{js,css,styl,html}'],
                tasks: ['clean', 'jshint', 'concat', 'uglify', 'stylus', 'cssmin', 'imagemin', 'copy', 'usemin', 'htmlmin'],
                options: {
                    spawn: false,
                },
            },
        },


    });

    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    // 注册任务
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'stylus', 'cssmin', 'imagemin', 'copy', 'usemin', 'htmlmin', 'watch']);

};