<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Attachment;

class AttachmentResponse extends Attachment
{
    protected $table = 'attachment_responses';

    public function response()
    {
        return $this->belongsTo(Response::class,'response_id');
    }

}
