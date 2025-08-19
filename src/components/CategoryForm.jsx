import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addCategories, setError, updateCategories } from '../redux/features/categories/AllCategoriesSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Hash, Palette, AlertCircle, X, Edit3, CheckCircle } from 'lucide-react';

const CategoryForm = () => {
    const selector = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const [err, setErr] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(5, "Kategori adı en az 5 karakter olmalıdır")
            .max(200, "Kategori adı en fazla 200 karakter olmalıdır")
            .required("Kategori adı zorunludur"),
        color: Yup.string().required("Renk seçimi zorunludur")
    });

    const { 
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            color: "#8B5CF6",
            id: ""
        }
    });

    const watchedColor = watch("color");
    const watchedName = watch("name");
    const isEditing = Boolean(selector.id);

    useEffect(() => {
        if (selector.id && selector.id != undefined) {
            console.log("Id algılandı", selector.id);
            const data = selector.data.filter((d) => d.id == selector.id)[0];
            console.log(data);
            setValue("name", data.name);
            setValue("color", data.color);
            setValue("id", data.id);
        } else {
            setValue("name", "");
            setValue("color", "#8B5CF6");
            setValue("id", "");
        }
    }, [selector.id, setValue]);

    useEffect(() => {
        if (selector.error) {
            setErr(true);
            // 5 saniye sonra hata mesajını kapat
            setTimeout(() => setErr(false), 5000);
        }
    }, [selector.error]);

    const onSubmit = (data) => {
        console.log(data);
        const same = selector.data.filter(c => c.name.toLowerCase() === data.name.toLowerCase());
        console.log(same);
        
        if (same.length > 0 && !data.id) {
            dispatch(setError("Aynı kategori zaten mevcut."));
        } else {
            console.log("Form gönderiliyor");
            const category = {
                "name": data.name,
                "color": data.color
            };
            console.log(data.color);
            
            if (data.id) {
                console.log("Kategori güncelleniyor", data);
                dispatch(updateCategories([category, data.id]));
            } else {
                console.log("Yeni kategori ekleniyor");
                dispatch(addCategories(category));
            }
        }
    };

    const clearForm = () => {
        console.log("Form temizleniyor");
        setValue("name", "");
        setValue("color", "#8B5CF6");
        setValue("id", "");
    };

    const predefinedColors = [
        '#10B981', '#EF4444', '#8B5CF6', '#F59E0B', 
        '#06B6D4', '#EC4899', '#84CC16', '#F97316'
    ];

    return (
        <div className="w-full">
            {/* Error Alert */}
            <AnimatePresence>
                {selector.error && err && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-red-800 dark:text-red-200 font-medium">
                                {selector.error}
                            </p>
                        </div>
                        <button 
                            onClick={() => setErr(false)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form Card */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
                        {isEditing ? (
                            <Edit3 className="w-5 h-5 text-white" />
                        ) : (
                            <Plus className="w-5 h-5 text-white" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {isEditing ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {isEditing ? 'Mevcut kategoriyi güncelleyin' : 'Todo\'larınız için kategori oluşturun'}
                        </p>
                    </div>
                </div>

                {/* Preview Card */}
                {watchedName && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-600"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl shadow-md flex items-center justify-center"
                                style={{ backgroundColor: watchedColor }}
                            >
                                <Hash className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {watchedName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Önizleme
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Hidden ID Field */}
                    <input {...register("id")} type="hidden" />

                    {/* Category Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Kategori Adı *
                        </label>
                        <div className="relative">
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Kategori adını giriniz..."
                                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                                    errors.name 
                                        ? 'border-red-300 dark:border-red-600 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                                        : 'border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                }`}
                            />
                            {errors.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-600 dark:text-red-400 text-xs"
                                >
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.name.message}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Category Color */}
                    <div className="space-y-3 mt-8">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Kategori Rengi *
                        </label>
                        
                        {/* Color Input and Display */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    {...register("color")}
                                    type="color"
                                    className="w-16 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 cursor-pointer bg-transparent"
                                    onChange={(e) => setValue("color", e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Seçili Renk
                                </p>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                                        style={{ backgroundColor: watchedColor }}
                                    />
                                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">
                                        {watchedColor}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Predefined Colors */}
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Hızlı seçim
                            </p>
                            <div className="grid grid-cols-8 gap-2">
                                {predefinedColors.map((color) => (
                                    <motion.button
                                        key={color}
                                        type="button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setValue("color", color)}
                                        className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                                            watchedColor === color 
                                                ? 'border-white dark:border-gray-900 ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                        }`}
                                        style={{ backgroundColor: color }}
                                    >
                                        {watchedColor === color && (
                                            <CheckCircle className="w-4 h-4 text-white mx-auto" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-purple-400 disabled:to-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    İşleniyor...
                                </>
                            ) : (
                                <>
                                    {isEditing ? (
                                        <>
                                            <Edit3 className="w-4 h-4" />
                                            Güncelle
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            Kategori Ekle
                                        </>
                                    )}
                                </>
                            )}
                        </motion.button>
                        
                        {(isEditing || watchedName) && (
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={clearForm}
                                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                {isEditing ? 'İptal' : 'Temizle'}
                            </motion.button>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CategoryForm;