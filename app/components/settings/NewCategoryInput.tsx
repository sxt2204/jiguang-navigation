import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NewCategoryInputProps {
    onAdd: (category: string) => void;
    isDarkMode: boolean;
}

export function NewCategoryInput({ onAdd, isDarkMode }: NewCategoryInputProps) {
    const [val, setVal] = useState('');
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onAdd(val);
            setVal('')
        }} className="flex gap-2">
            <Input
                placeholder="输入新分类名称..."
                value={val}
                onChange={e => setVal(e.target.value)}
                className="flex-1"
            />
            <Button type="submit" disabled={!val.trim()} size="icon">
                <Plus size={16} />
            </Button>
        </form>
    )
}
