// store.jsx
import { create } from '../UIFiles/create';
import brain from '../UIFiles/brain';
import { toast } from 'sonner';

export const useStore = create((set, get) => ({
  trains: [],
  bookings: [],
  isLoading: false,
  error: null,

  fetchTrains: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await brain.list_trains();
      const data = await response.json();

      // Transform the data to match our frontend types
      const trains = data.trains.map((train) => ({
        id: train.id,
        name: train.name,
        compartments: train.compartments.map((compartment) => ({
          id: compartment.id,
          name: compartment.name,
          seats: compartment.seats.map((seat) => ({
            id: seat.id,
            number: seat.number,
            isAvailable: seat.is_available,
            position: seat.position,
          })),
        })),
      }));

      set({ trains, isLoading: false });
    } catch (error) {
      console.error('Error fetching trains:', error);
      set({ 
        error: 'Failed to load trains. Please try again later.', 
        isLoading: false 
      });
      toast.error('Failed to load trains');
    }
  },

  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    // Simulate API call with placeholder data
    setTimeout(() => {
      const mockBookings = [
        {
          id: 'booking-1',
          trainId: 'train-1',
          trainName: 'Express 101',
          compartmentId: 'comp-1',
          compartmentName: 'Compartment A',
          seatIds: ['seat-1', 'seat-2'],
          seatNumbers: ['A1', 'A2'],
          passengerName: 'John Doe',
          passengerEmail: 'john@example.com',
          journeyDate: '2025-04-01T10:00:00Z',
          bookingDate: '2025-03-15T14:30:00Z',
          status: 'confirmed',
          groupSize: 2,
        },
      ];

      set({ bookings: mockBookings, isLoading: false });
    }, 1000);
  },

  createBooking: async (bookingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await brain.create_booking(bookingData);
      const data = await response.json();

      // Add the new booking to our local state
      const newBooking = {
        id: data.id,
        trainId: data.train_id,
        trainName: data.train_name,
        compartmentId: data.compartment_id,
        compartmentName: data.compartment_name,
        seatIds: data.seat_ids,
        seatNumbers: data.seat_numbers,
        passengerName: data.passenger_name,
        passengerEmail: data.passenger_email,
        journeyDate: data.journey_date,
        bookingDate: data.booking_date,
        status: data.status,
        groupSize: data.group_size,
      };

      // Update the state with the new booking
      set((state) => ({
        bookings: [...state.bookings, newBooking],
      }));

      toast.success('Booking created successfully!');
      return true;
    } catch (error) {
      console.error('Error creating booking:', error);
      let errorMessage = 'Failed to create booking. Please try again.';

      // Handle JSON response with error details
      if (error.response) {
        try {
          const errorData = error.response;
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
      }

      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  findGroupSeats: async (trainId, compartmentId, groupSize) => {
    set({ isLoading: true, error: null });
    try {
      const response = await brain.find_group_seats({
        train_id: trainId,
        compartment_id: compartmentId,
        group_size: groupSize,
      });

      if (!response.ok) {
        // Handle non-OK responses
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Failed to find seats for your group';

        console.error('Error finding group seats:', errorData);
        set({ error: errorMessage, isLoading: false });
        toast.error(errorMessage);
        return [];
      }

      const data = await response.json();
      return data.seat_ids;
    } catch (error) {
      console.error('Error finding group seats:', error);
      let errorMessage =
        'Failed to find seats for your group. Please try manually selecting seats.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
}));
