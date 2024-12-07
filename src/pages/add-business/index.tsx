import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useBusinessStore from '../../store/buisnessSrore';
import { useNavigate } from 'react-router-dom';

interface Business {
  _id?: string;
  business_name: string;
  business_location?: string;
  business_url?: string;
  current_cashflow?: { value?: number; notes?: string[] };
  asking_price?: { value?: number; notes?: string[] };
}

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const { fetchAllBusiness, addBusiness, deleteBusiness } = useBusinessStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [newBusiness, setNewBusiness] = useState<Business>({
    business_name: '',
    business_location: '',
    business_url: '',
    current_cashflow: { value: 0, notes: [] },
    asking_price: { value: 0, notes: [] },
  });
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    setIsPageLoading(true);
    const fetchData = async () => {
      try {
        const allBusinesses = await fetchAllBusiness();
        if(localStorage.getItem('business_payload')){
          const business = JSON.parse(localStorage.getItem('business')!);
          console.log("business", business);
          setBusinesses([...businesses, business, ...allBusinesses.businesses]);
        }else{
          setBusinesses(allBusinesses.businesses);
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setIsPageLoading(false);
      }
    };
    if(userId){
      fetchData();
      if(localStorage.getItem('business_payload')){
        const business = JSON.parse(localStorage.getItem('business')!);
        console.log("business", business);
        setBusinesses([...businesses, business]);
        setIsPageLoading(false);
      }
    }else{
      const business = localStorage.getItem('business');
      if(business){
        setBusinesses([JSON.parse(business)]);
        setIsPageLoading(false);
      }
    }
    setIsPageLoading(false);
  }, [fetchAllBusiness, navigate, userId]);

  const handleAddBusiness = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewBusiness({
      business_name: '',
      business_location: '',
      business_url: '',
      current_cashflow: { value: 0, notes: [] },
      asking_price: { value: 0, notes: [] },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBusiness((prev) => ({
      ...prev,
      [name]: name === 'current_cashflow' || name === 'asking_price'
        ? { ...(prev[name as keyof Business] as { value?: number; notes?: string[] }), value: parseFloat(value) }
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(userId){
        const addedBusiness = await addBusiness(newBusiness);
        setBusinesses([...businesses, addedBusiness.newBusiness]);
      }else{
        const id = crypto.randomUUID().replace(/-/g, '').substring(0, 24);
        setBusinesses([...businesses, {...newBusiness, _id: id}]);
        localStorage.setItem('business', JSON.stringify({...newBusiness, _id: id}));
      }
      handleClosePopup();
    } catch (error) {
      console.error('Error adding business:', error);
    }
  };

  const handleDeleteBusiness = async (id: string) => {
    try {
      if(userId){
        await deleteBusiness(id);
        setBusinesses(businesses.filter((business) => business._id !== id));
      }else{
        localStorage.removeItem('business');
        setBusinesses(businesses.filter((business) => business._id !== id));
      }
    } catch (error) {
      console.error('Error deleting business:', error);
    }
  };

  const handleBusinessClick = (id: string) => {
    navigate(`/dashboard/${id}`);
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Businesses</h1>
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddBusiness}>
              <Plus className="mr-2 h-4 w-4" /> Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Business</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {['business_name', 'business_location', 'business_url', 'current_cashflow', 'asking_price'].map((field) => (
                  <div className="grid grid-cols-4 items-center gap-4" key={field}>
                    <Label htmlFor={field} className="text-right capitalize">
                      {field.replace('_', ' ')}
                    </Label>
                    <Input
                      id={field}
                      name={field}
                      type={field === 'current_cashflow' || field === 'asking_price' ? 'number' : 'text'}
                      value={(field === 'current_cashflow' || field === 'asking_price') ? (newBusiness[field] as { value?: number })?.value : newBusiness[field as keyof Business] as string | number | undefined}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Card key={business._id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{business.business_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">
                <span className="font-medium">Cashflow:</span> ${business.current_cashflow?.value?.toLocaleString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Asking Price:</span> ${business.asking_price?.value?.toLocaleString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleBusinessClick(business._id!)}>
                View Details
              </Button>
              <Button variant="destructive" size="icon" onClick={() => handleDeleteBusiness(business._id!)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
